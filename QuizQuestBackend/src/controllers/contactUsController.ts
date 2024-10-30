/** @format */

import { Request, Response } from "express";
import { contactUsEmail } from "../mail/template/contactFormRes"
import mailSender from "../utils/mailSender";

// Define the `contactUsController` with appropriate parameter types
export const contactUsController = async (req: Request, res: Response) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;
  console.log(req.body);

  try {
    const emailRes = await mailSender(
      email,
      "Your Data sent successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );

    console.log("Email Response: ", emailRes);
    return res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: any) {
    console.log("Error message:\n", error.message);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
