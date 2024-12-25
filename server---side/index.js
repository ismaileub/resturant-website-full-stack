const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
//const jwt = require('jsonwebtoken');       for access token
require('dotenv').config();

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
        const reviewCollection = client.db("resturant").collection("reviews");
        const userCollection = client.db("resturant").collection("users");



        // menu related apis
        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        });

        app.get('/reviews', async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result);
        })


        //user related apis

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
