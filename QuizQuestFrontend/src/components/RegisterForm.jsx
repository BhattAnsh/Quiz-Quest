/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import CountryCode from "../data/countryCode.json";
import { toast } from "react-hot-toast";

const RegisterForm = ({ border }) => {
	const [loading, setLoading] = useState(false);
	const [ccode, setCode] = useState("");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const submitContactForm = async (data) => {
        console.log("Form Data - ", data);
        if (data.age < 0) {
            toast.error("Please neter valid age");
            return;
        }
		const toastId = toast.loading("Loading...");
		setTimeout(() => {
			toast.dismiss(toastId);
			toast.success("Message sent successfully!");
			setLoading(false);
		}, 2000);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				email: "",
				firstname: "",
				lastname: "",
				message: "",
				phoneNo: "",
			});
		}
	}, [reset, isSubmitSuccessful]);

	return (
		<form
			className={`flex flex-col gap-7 mb-[70px] p-8 ${
				border === "undefined"
					? "border-[2px] border-richblack-500 rounded-md"
					: ""
			} w-full`}
			onSubmit={handleSubmit(submitContactForm)}>
			<div className="flex flex-col gap-5 lg:flex-row">
				{/* Reference name */}
				<div className="flex flex-col gap-2 lg:w-[48%]">
					<label
						htmlFor="id"
						className="lable-style">
						Reference Id:
					</label>
					<input
						type="text"
						name="id"
						id="id"
						placeholder="Enter Reference Id:"
						className="form-style"
						{...register("id", { required: true })}
					/>
					{errors.id && (
						<span className="-mt-1 text-[12px] text-yellow-100">
							Please enter your Reference Id.
						</span>
					)}
				</div>

				{/* Name */}
				<div className="flex flex-col gap-2 lg:w-[48%]">
					<label
						htmlFor="name"
						className="lable-style">
						Name:
					</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Enter name"
						className="form-style"
						{...register("name", { required: true })}
					/>
					{errors.name && (
						<span className="-mt-1 text-[12px] text-yellow-100">
							Please enter your name.
						</span>
					)}
				</div>
			</div>

			{/* Email-Address */}
			<div className="flex flex-col gap-2">
				<label
					htmlFor="email"
					className="lable-style">
					Email Address:
				</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Enter email address"
					className="form-style"
					{...register("email", { required: true })}
				/>
				{errors.email && (
					<span className="-mt-1 text-[12px] text-yellow-100">
						Please enter your valid Email address.
					</span>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<label
					htmlFor="phonenumber"
					className="lable-style">
					Phone Number:
				</label>

				<div className="flex gap-5">
					<div className="flex w-[90px]  flex-col gap-2">
						<select
							type="text"
							name="countrycode"
							id="countrycode"
							placeholder="Enter countrycode name"
							className="form-style"
							// onClick={setCountryCode}
							{...register("countrycode", { required: true })}>
							{CountryCode.map((ele, i) => {
								return (
									<option
										key={i}
										value={ele.code}>
										{ele.code} {ele.country}
									</option>
								);
							})}
						</select>
					</div>

					<div className="flex w-[calc(100%-90px)] flex-col gap-2">
						<input
							type="text"
							name="phonenumber"
							id="phonenumber"
							placeholder="12345 67890"
							className="form-style"
							{...register("phoneNo", {
								required: {
									value: true,
									message: "Please enter your Phone Number.",
								},
								maxLength: { value: 10, message: "Invalid Phone Number" },
								minLength: { value: 10, message: "Invalid Phone Number" },
							})}
						/>
					</div>
				</div>
				{errors.phoneNo && (
					<span className="-mt-1 text-[12px] text-yellow-100">
						{errors.phoneNo.message}
					</span>
				)}
			</div>

			<div className="flex flex-row gap-4 justify-between items-center">
				<div className="flex justify-center flex-col items-center gap-2">
					<div className="flex justify-center items-center gap-2">
						<label
							htmlFor="age"
							className="lable-style">
							Age:
						</label>
						<input
							type="number"
							min={1}
							name="age"
							id="age"
							placeholder="Enter age"
							className="form-style"
							{...register("age", { required: true })}
						/>
					</div>
					{errors.age && (
						<span className="-mt-1 left-0 text-[12px] text-yellow-100">
							Please enter your age.
						</span>
					)}
				</div>
				<div className="flex justify-center flex-col items-center gap-2">
					<div className="flex justify-center items-center gap-2">
						<span className="lable-style">Gender:</span>
						<select
							htmlFor="gender"
							className="form-style">
							<option selected={true}>
								{"  "}--Please select-- {"  "}
							</option>
							<option>Male</option>
							<option>Female</option>
							<option>Other</option>
						</select>
					</div>
					{errors.gender && (
						<span className="-mt-1 text-[12px] text-yellow-100">
							Please enter your Gender.
						</span>
					)}
				</div>
			</div>

			<div className="flex flex-row gap-2 justify-start items-center">
				<input
					type="checkbox"
					name="checkbox"
					id="checkbox"
					className="w-[16px] h-[16px]"
					{...register("checkbox", { required: true })}
				/>
				<label
					htmlFor="checkbox"
					className="lable-style text-lg">
					Agree to Terms and Conditions.
				</label>

				{errors.checkbox && (
					<span className="-mt-1 text-[12px] text-yellow-100">
						Please mark checkbox.
					</span>
				)}
			</div>

			<button
				disabled={loading}
				type="submit"
				className={`rounded-md bg-yellow-50 hover:bg-yellow-100 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
						!loading &&
						"transition-all duration-200 hover:scale-95 hover:shadow-none"
					}  disabled:bg-richblack-500 sm:text-[16px] `}>
				Send Message
			</button>
		</form>
	);
};

export default RegisterForm;
