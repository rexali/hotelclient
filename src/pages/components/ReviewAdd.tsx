import React, { useState } from 'react';
import { addReviewAPI } from '../api/addReviewAPI';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

interface Review {
    content: string;
    rating: string;
}

const initialReview: Review = {
    content: "",
    rating: ''
};

export default function ReviewAdd({ RoomId }: { RoomId: string }) {
    const [review, setReview] = useState<Review>({ ...initialReview });
    const [status, setStatus] = useState<string | null>(null);
    const { user } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setReview((prev: any) => {

            return {
                ...prev,
                [name]: type === 'number' ? Number(value) : value
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending data...");
        console.log({ ...review, RoomId });
        let result = await addReviewAPI({ 
            ...review, 
            RoomId: parseInt(RoomId), 
            UserId: parseInt(user.userId) 
        });
        if (result) {
            setStatus("Review submitted!");
            setReview(initialReview);
            toast("Review submitted!")
        } else {
            toast("Error! Review not submitted!")
        }

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto bg-white p-6 rounded-lg shadow space-y-6"
        >
            {/* <h2 className="text-xl font-bold mb-4 text-gray-900 text-left">Add review</h2> */}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <textarea
                    name="content"
                    value={review.content}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input
                    type='number'
                    name="rating"
                    value={review.rating}
                    onChange={handleChange}
                    min={1}
                    max={5}
                    className="w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex items-end space-x-4">
                {status && (
                    <div className={status === "Review submitted!" ? 'text-green-500' : 'text-blue-500'}>
                        {status}
                    </div>
                )}
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                >
                    Post review
                </button>
            </div>
        </form>
    );
}