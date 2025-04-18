const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken'); //for access token
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const formData = require('form-data');
const Maligun = require('mailgun.js');
const mailgun = new Maligun(formData);

const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY
});

//stripe for payment

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
//console.log(user, pass);



const uri = `mongodb+srv://${user}:${pass}@cluster0.0c9fo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const menuCollection = client.db("resturant").collection("menu");
        const testimonialsCollection = client.db("resturant").collection("testimonials");
        const userCollection = client.db("resturant").collection("users");
        const cartCollection = client.db("resturant").collection("carts");
        const paymentCollection = client.db("resturant").collection("payments");
        const reviewCollection = client.db("resturant").collection("reviews");
        const reservationCollection = client.db("resturant").collection("reservation");





        // jwt related api
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ token });
        })

        // middlewares 
        const verifyToken = (req, res, next) => {
            // console.log('inside verify token', req.headers.authorization);
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'unauthorized access' });
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'unauthorized access' })
                }
                req.decoded = decoded;
                next();
            })
        }

        // use verify admin after verifyToken
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }




        //menu related api
        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        });

        app.get('/menu/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await menuCollection.findOne(query);
            res.send(result);
        })


        app.post('/menu', verifyToken, verifyAdmin, async (req, res) => {
            const item = req.body;
            const result = await menuCollection.insertOne(item);
            res.send(result);
        });

        app.delete('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await menuCollection.deleteOne(query);
            res.send(result);
        })





        app.get('/testimonials', async (req, res) => {
            const result = await testimonialsCollection.find().toArray();
            res.send(result);
        })

        // carts collection
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await cartCollection.find(query).toArray();
            res.send(result);
        });

        app.post('/carts', async (req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
        });

        app.patch('/menu/:id', async (req, res) => {
            const item = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updatedDoc = {
                $set: {
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    recipe: item.recipe,
                    image: item.image
                }
            }

            const result = await menuCollection.updateOne(filter, updatedDoc)
            res.send(result);
        })

        app.delete('/carts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        });


        //user related apis

        // users related api
        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            //console.log(req.headers);
            const result = await userCollection.find().toArray();
            res.send(result);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            // insert email if user doesnt exists: 
            // you can do this many ways (1. email unique, 2. upsert 3. simple checking)
            const query = { email: user.email }
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        });


        app.get('/users/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;

            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const query = { email: email };
            const user = await userCollection.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === 'admin';
            }
            res.send({ admin });
        })


        app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })



        // POST a new review
        app.post('/reviews', async (req, res) => {
            try {
                const review = req.body;


                const result = await reviewCollection.insertOne(review);
                res.send({
                    message: 'Review added successfully!',
                    insertedId: result.insertedId
                });
            } catch (error) {
                console.error('Error saving review:', error);
                res.status(500).send({ message: 'Failed to add review.' });
            }
        });


        // POST a new reservation
        app.post('/reservations', async (req, res) => {
            try {
                const reservation = req.body;


                const result = await reservationCollection.insertOne(reservation);
                res.send({
                    message: 'reservation added successfully!',
                    insertedId: result.insertedId
                });
            } catch (error) {
                console.error('Error saving reservation:', error);
                res.status(500).send({ message: 'Failed to booked reservation.' });
            }
        });


        //get all booking 
        app.get('/bookings', async (req, res) => {
            //console.log(req.headers);
            const result = await reservationCollection.find().toArray();
            res.send(result);
        });


        //update booking status
        app.patch("/bookings/:id", async (req, res) => {
            const { id } = req.params;
            const result = await reservationCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { status: req.body.status } }
            );
            res.send(result);
        });


        // payment intent
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            console.log(amount, 'amount inside the intent')

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        });


        app.get('/payments/:email', verifyToken, async (req, res) => {
            const query = { email: req.params.email }
            if (req.params.email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            const result = await paymentCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const paymentResult = await paymentCollection.insertOne(payment);

            //  carefully delete each item from the cart
            console.log('payment info', payment);
            const query = {
                _id: {
                    $in: payment.cartIds.map(id => new ObjectId(id))
                }
            };

            const deleteResult = await cartCollection.deleteMany(query);


            mg.messages.create(process.env.MAIL_SENDING_DOMAIN, {
                from: `Excited User <mailgun@${process.env.MAIL_SENDING_DOMAIN}>`,
                to: ["ismail301515@gmail.com"],
                subject: "Hello",
                text: "Food Paradise order confirmation",
                html: `
                <div>
                 <h1>Thank you for your order!</h1>
                 <h4>Your transition Id: <strong>${payment.transactionId}</strong> </h4>
                </div>
               `
            })
                .then(msg => console.log(msg)) // logs response data
                .catch(err => console.error(err)); // logs any error

            res.send({ paymentResult, deleteResult });
        })



        // stats or analytics
        app.get('/admin-stats', verifyToken, verifyAdmin, async (req, res) => {
            const users = await userCollection.estimatedDocumentCount();
            const menuItems = await menuCollection.estimatedDocumentCount();
            const orders = await paymentCollection.estimatedDocumentCount();

            // this is not the best way
            // const payments = await paymentCollection.find().toArray();
            // const revenue = payments.reduce((total, payment) => total + payment.price, 0);

            const result = await paymentCollection.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: '$price'
                        }
                    }
                }
            ]).toArray();

            const revenue = result.length > 0 ? result[0].totalRevenue : 0;

            res.send({
                users,
                menuItems,
                orders,
                revenue
            })
        })


        // using aggregate pipeline
        // app.get('/order-stats', async (req, res) => {
        //     const result = await paymentCollection.aggregate([
        //         {
        //             $unwind: '$menuItemIds'
        //         },
        //         {
        //             $lookup: {
        //                 from: 'menu',
        //                 localField: 'menuItemIds',
        //                 foreignField: '_id',
        //                 as: 'menuItems'
        //             }
        //         },
        //         {
        //             $unwind: '$menuItems'
        //         },
        //         {
        //             $group: {
        //                 _id: '$menuItems.category',
        //                 quantity: { $sum: 1 },
        //                 revenue: { $sum: '$menuItems.price' }
        //             }
        //         },
        //         {
        //             $project: {
        //                 _id: 0,
        //                 category: '$_id',
        //                 quantity: '$quantity',
        //                 revenue: '$revenue'
        //             }
        //         }
        //     ]).toArray();
        //     console.log(result);

        //     res.send(result);

        // })

        // app.get('/order-stats', async (req, res) => {
        //     const result = await paymentCollection.aggregate([
        //         {
        //             $lookup: {
        //                 from: 'menu',
        //                 localField: 'menuItemIds',
        //                 foreignField: '_id',
        //                 as: 'menuItems'
        //             }
        //         },
        //         {
        //             $project: {
        //                 menuItemIds: 1,
        //                 menuItems: 1
        //             }
        //         }
        //     ]).toArray();

        //     console.log(result); // Debug the result
        //     res.send(result);
        // });

        app.get('/order-stats', verifyToken, verifyAdmin, async (req, res) => {
            const result = await paymentCollection.aggregate([
                {
                    $addFields: {
                        menuItemIds: {
                            $map: {
                                input: "$menuItemIds",
                                as: "item",
                                in: { $toObjectId: "$$item" }
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'menu',
                        localField: 'menuItemIds',
                        foreignField: '_id',
                        as: 'menuItems'
                    }
                },
                {
                    $unwind: "$menuItems"
                },
                {
                    $group: {
                        _id: "$menuItems.category", // Group by category
                        quantity: { $sum: 1 }, // Count occurrences
                        revenue: { $sum: "$price" } // Sum total revenue
                    }
                },
                {
                    $project: {
                        _id: 0, // Hide _id
                        category: "$_id", // Rename _id to category
                        quantity: 1, // Show quantity
                        revenue: 1 // Show revenue
                    }
                }
            ]).toArray();

            console.log(result); // Debugging output
            res.send(result);
        });





        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('food paradise server is cooking');
})

app.listen(port, () => {
    console.log(`server is cooking on port ${port}`);
})
