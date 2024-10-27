/** @format */

import React from "react";
import RegistrationForm from "@/components/RegistrationForm";

const Registration = () => {
	return (
		<div className=" bg-richblack-900">
			<div className="mx-auto pt-[150px] pb-[50px] w-11/12  gap-10 text-white">
				
				{/* Contact Form */}
				<div className="lg:w-[60%] md:w-[80%] w-[95%] mx-auto">
					<RegistrationForm />
				</div>
			</div>
		</div>
	);
};

export default Registration;
