/** @format */

import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RateUs() {
	const [isOpen, setIsOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const navigate = useNavigate();
	const [message, setMessage] = useState("");

	const handleRatingChange = (newRating) => setRating(newRating);
	const handleMessageChange = (event) => setMessage(event.target.value);

	const submitRating = () => {
		if (message.length < 2) {
			toast.error("Please Enter Message!");
			return;
		}
		console.log("Rating:", rating);
		console.log("Message:", message);
		setMessage("");
		setRating(0);
		setIsOpen(false); // Close modal after submitting
        toast.success("Thanks for Rating our website!");
        navigate("/");
	};

	useEffect(() => {
		if (!isOpen) setIsOpen(true);
	});

	const handleClose = () => {
		setIsOpen(false);
		navigate("/");
	};

	return (
		isOpen && (
			<div className="fixed inset-0 z-[1000] grid place-items-center bg-black bg-opacity-50 backdrop-blur-sm">
				<div className="w-11/12 max-w-[350px] rounded-lg border border-pure-greys-600 bg-richblack-800 p-6">
					<h2 className="text-3xl text-center font-bold text-white mb-4">
						Rate Us
					</h2>

					{/* Star Rating */}
					<ReactStars
						count={5}
						value={rating}
						size={30}
						onChange={handleRatingChange}
						activeColor="#ffd700"
						emptyIcon={<FaStar />}
						fullIcon={<FaStar />}
					/>

					{/* Message Textarea */}
					<textarea
						value={message}
						onChange={handleMessageChange}
						placeholder="Leave us a message"
						className="mt-4 w-full p-2 rounded-md bg-richblack-700 text-white"
						rows={3}></textarea>

					{/* Submit and Close Buttons */}
					<div className="flex justify-end mt-4 gap-4">
						<button
							onClick={handleClose}
							className="px-4 py-2 bg-richblack-500 text-white font-semibold rounded-md hover:bg-richblack-600">
							Close
						</button>
						<button
							onClick={submitRating}
							className="mr-2 px-4 py-2 bg-yellow-100 text-black font-semibold rounded-md hover:bg-yellow-200">
							Submit
						</button>
					</div>
				</div>
			</div>
		)
	);
}
