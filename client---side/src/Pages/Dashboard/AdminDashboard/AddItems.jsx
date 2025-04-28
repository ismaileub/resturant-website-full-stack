import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/Common/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../components/Hooks/useAxiosPublic";
import useAxiosSecure from "../../../components/Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        });

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            };

            const menuRes = await axiosSecure.post('/menu', menuItem);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div className="w-full h-full  mx-auto px-24 bg-gray-100 rounded-lg ">
            <SectionTitle heading="ADD AN ITEM" subHeading="---What's new?---" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-gray-700">Recipe Name*</label>
                    <input type="text" {...register('name', { required: true })} placeholder="Recipe name"
                        className="w-full px-4 py-2 border rounded-md " required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Category*</label>
                        <select {...register('category', { required: true })}
                            className="w-full px-4 py-2 border rounded-md ">
                            <option disabled value="default">Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Price*</label>
                        <input type="number" {...register('price', { required: true })} placeholder="Price"
                            className="w-full px-4 py-2 border rounded-md " />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Recipe Details*</label>
                    <textarea {...register('recipe')} placeholder="Recipe Details"
                        className="w-full px-4 py-2 border rounded-md h-24 focus:ring focus:ring-yellow-400"></textarea>
                </div>

                <div>
                    <input {...register('image', { required: true })} type="file"
                        className="block  text-gray-700 cursor-pointer" />
                </div>

                <button type="submit" className=" flex items-center justify-center bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700">
                    Add Item <FaUtensils className="ml-2" />
                </button>
            </form>
        </div>
    );
};

export default AddItems;
