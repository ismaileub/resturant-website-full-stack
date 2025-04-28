import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../components/Hooks/useAxiosPublic";
import useAxiosSecure from "../../../components/Hooks/useAxiosSecure";
import SectionTitle from "../../../components/Common/SectionTitle";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { name, category, recipe, price, _id, image } = useLoaderData();
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [selectedImage, setSelectedImage] = useState(null); // Track new image preview

    const onSubmit = async (data) => {
        let imageUrl = image; // Default to existing image

        // Check if user uploaded a new image
        if (data.image && data.image.length > 0) {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                imageUrl = res.data.data.display_url; // Use new image URL
            }
        }

        // Send updated menu item data
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: imageUrl
        };

        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);

        if (menuRes.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} has been updated.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    // Handle image preview
    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <div className="px-6 py-8">
            <SectionTitle heading="Update Item" subHeading="Modify Recipe Details" />

            <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Recipe Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Recipe Name*</label>
                        <input
                            type="text"
                            defaultValue={name}
                            {...register('name', { required: true })}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-500"
                        />
                    </div>

                    {/* Category & Price */}
                    <div className="flex gap-4">
                        {/* Category */}
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-semibold">Category*</label>
                            <select
                                defaultValue={category}
                                {...register('category', { required: true })}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-500"
                            >
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-semibold">Price*</label>
                            <input
                                type="number"
                                defaultValue={price}
                                {...register('price', { required: true })}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-500"
                            />
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Recipe Details</label>
                        <textarea
                            defaultValue={recipe}
                            {...register('recipe')}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-500 h-24"
                        />
                    </div>

                    {/* Image Preview & Upload */}
                    <div className="flex justify-around items-center gap-6">
                        {/* Current Image */}
                        <div className="flex flex-col items-center">
                            <label className="text-gray-700 font-semibold">Current Image</label>
                            <img src={image} alt="Current Item" className="w-32 h-32 rounded-lg object-cover border" />
                        </div>

                        {/* Upload New Image */}
                        <div className="flex flex-col items-center">
                            <label className="text-gray-700 font-semibold">Upload New Image</label>
                            <input
                                {...register('image')}
                                type="file"
                                className="file-input w-full max-w-xs"
                                onChange={handleImageChange}
                            />
                            {selectedImage && (
                                <img src={selectedImage} alt="New Preview" className="w-32 h-32 rounded-lg object-cover border mt-2" />
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-yellow-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-yellow-700 transition">
                        Update Recipe Details
                    </button>

                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
