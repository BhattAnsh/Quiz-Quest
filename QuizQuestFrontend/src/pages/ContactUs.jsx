/** @format */

import React from "react";
import ContactDetails from "../components/contact/ContactDetails"
import ContactForm from "@/components/contact/Contactform";

const Contact = () => {
	return (
		<div className=" bg-richblack-900">
			<div className="mx-auto pt-[150px] pb-[50px] flex w-11/12 max-w-maxContent flex-col lg:items-start items-center lg:justify-between  gap-10 text-white lg:flex-row">
				{/* Contact Details */}
				<div className="lg:w-[30%] w-{80%}">
					<ContactDetails />
				</div>

				{/* Contact Form */}
				<div className="lg:w-[60%] md:-[80%] w-[95%]">
					<ContactForm />
				</div>
			</div>

		</div>
	);
};

export default Contact;
