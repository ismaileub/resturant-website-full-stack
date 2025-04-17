import React, { useRef, useState } from 'react';
import useAuth from '../../../Components/Hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import SectionTitle from '../../../Components/Common/SectionTitle';

const AddReview = () => {
    const { user } = useAuth();
    const formRef = useRef(null);
    const [rating, setRating] = useState(0); // keeping rating state to manage UI

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please give a rating before submitting!");
            return;
        }

        const formData = new FormData(formRef.current);
        const reviewData = {
            name: user.displayName,
            email: user.email,
            recipe: formData.get('recipe'),
            suggestion: formData.get('suggestion'),
            review: formData.get('review'),
            rating: rating,
        };

        try {
            const res = await fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (res.ok) {
                toast.success("Review submitted successfully!");
                formRef.current.reset();
                setRating(0);
            } else {
                toast.error("Failed to submit review.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Something went wrong while submitting!");
        }
    };


    return (
        <div className="bg-gray-100 min-h-screen inter flex items-center justify-center p-4">
            <Toaster />
            <div className="bg-white w-full max-w-5xl p-6 rounded-md shadow-md">
                <div className="text-center my-6">
                    <SectionTitle
                        subHeading="Sharing is Caring!!"
                        heading={'GIVE A REVIEW...'}
                    ></SectionTitle>
                </div>

                <div className="bg-gray-50 p-6 rounded-md shadow-inner">
                    <h3 className="text-center text-lg font-semibold mb-4">RATE US!</h3>

                    <div className="flex justify-center mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'
                                    }`}
                                onClick={() => setRating(star)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>

                    <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Which recipe you liked most?
                            </label>
                            <input
                                type="text"
                                name="recipe"
                                placeholder="Recipe you liked most"
                                className="w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Do you have any suggestion for us?
                            </label>
                            <input
                                type="text"
                                name="suggestion"
                                placeholder="Suggestion"
                                className="w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Kindly express your care in a short way.
                            </label>
                            <textarea
                                name="review"
                                placeholder="Review in detail"
                                className="w-full border border-gray-300 rounded-md p-2 h-24"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-yellow-800 flex items-center gap-2"
                        >
                            Send Review 🚀
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;
