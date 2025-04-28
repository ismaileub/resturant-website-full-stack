import React from "react";
import { useForm } from "react-hook-form";
import bgimg from '../../assets/others/authentication.png'
import img from '../../assets/others/authentication2.png'
import useAuth from "../../components/Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../components/Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";


const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn } = useAuth();

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    toast.success('User Created!')
                                    navigate('/');
                                }
                            })


                    })
                    .catch(error => console.log(error))


            }).catch(error => {
                console.log(error);

                if (error.code === "auth/email-already-in-use") {
                    toast.error("Email is already in use.");
                } else if (error.code === "auth/weak-password") {
                    toast.error("Password is too weak.");
                } else {
                    toast.error("An unknown error occurred.");
                }
            })
    };

    const handleGoogleSignIn = () => {
        //console.log("hello");
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgimg})` }}
        >
            <Toaster />
            <div className="shadow-lg py-12 pl-36 pr-24 rounded-lg w-[80%]">
                <div className="  gap-16  flex">
                    {/* Form Section */}
                    <div className="w-1/2">
                        <h2 className="text-3xl font-extrabold mb-6 text-center">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#dab153]"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#dab153]"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#dab153]"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 bg-[#dab153] text-white font-medium rounded-md hover:bg-[#bb8506] transition"
                            >
                                Sign Up
                            </button>
                        </form>


                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Already registered?{' '}
                                <a href="login" className="text-[#BB8506] underline font-semibold">
                                    Go to log in
                                </a>
                            </p>
                            <p className="mt-4 text-gray-600">Or sign up with</p>
                            <div className="flex justify-center gap-4 mt-4">
                                <button className="p-3 text-xl text-gray-600 border border-gray-400 rounded-full hover:text-white hover:bg-[#4267B2] transition">
                                    <FaFacebook />
                                </button>
                                <button onClick={handleGoogleSignIn} className="p-3 text-xl text-gray-600 border border-gray-400 rounded-full transition hover:bg-green-500">
                                    <FaGoogle />
                                </button>

                                <button className="p-3 text-xl text-gray-600 border border-gray-400 rounded-full hover:text-white hover:bg-[#333] transition">
                                    <FaGithub />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Side Image */}
                    <div className="w-1/2 flex justify-center items-center">
                        <img src={img} alt="Signup Illustration" className="" />

                    </div>


                </div>



            </div>

        </div>
    );
};

export default SignUp;
