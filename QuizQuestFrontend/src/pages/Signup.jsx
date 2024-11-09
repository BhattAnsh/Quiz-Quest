/** @format */

import { useState } from "react";
import svgImage from "../images/right-img.svg";
import googleImg from "../images/google-img.jpg";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

//for sign up with google
import useGoogleOauth from "../api/useGoogleOauth";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      toast.error("Incorrect Password!");
      return;
    }

    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    // Password validation regex (at least 8 characters, one uppercase, one lowercase, one digit, one special character)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter valid email");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password having at least 8 characters, one uppercase, one lowercase, one digit, one special character"
      );
      return;
    }

    toast.success("Signup successfully");
    navigate("/");
    console.log(formData);
  };

  //to handle oauths
  const { googleLoginSignUp } = useGoogleOauth();

  return (
    <>
      <div className="flex flexbox h-screen  justify-center  bg-[#0E1C1B] text-[#aad1a9] py-[10vh]">
        <div className="flex flexbox items-center justify-center gap-x-[100px] border-[1px] border-[#1a2224] px-[100px] w-[1000px] rounded-3xl sphere-card">
          <div className="grid gap-y-[10px]">
            <h1 className="text-center text-[30px] font-bold">Signup Form</h1>
            <form className="grid gap-y-[10px]" onSubmit={handleSubmit}>
              <div>
                {/* <label htmlFor="Email">Email:</label> */}
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  required
                />
              </div>
              <div>
                {/* <label htmlFor="Email">Email:</label> */}
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  required
                />
              </div>
              <div>
                {/* <label htmlFor="password">Password:</label> */}
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  required
                />
              </div>
              <div>
                {/* <label htmlFor="Email">Email:</label> */}
                <Input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  value={formData.cpassword}
                  onChange={handleChange}
                  placeholder="Enter confirm password"
                  className="outline-none bg-[#0E1C1B] border-[1px] border-[#aad1a9] w-[300px] h-[45px] rounded-lg pl-[13px] placeholder-[#aad1a9]"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#aad1a9] rounded-lg h-[35px] text-[#2b3d2a] font-medium"
              >
                Signup
              </button>
            </form>

            <div className="border-solid w-[300px] h-[45px] text-l cursor-pointer flex justify-center text-center mt-[30px]">
              <button
                className="text-center justify-center px-1 py-[4px] w-[250px] h-[45px] border-[1px] border-[#aad1a9] rounded-3xl gap-x-[10px] relative"
                onClick={googleLoginSignUp}>
                <img
                  className="h-[35px] rounded-[162px] w-[38px] object-cover"
                  src={googleImg}
                ></img>
                <span className="mt-[5px] w-[200px] absolute top-[3px] left-[30px]">
                  Continue with Google
                </span>
              </button>
            </div>

            <div className="flex justify-center items-center gap-4">
              <div className="h-[1px] bg-white w-[70%]"></div>
              <p className="text-center text-sm text-[whitesmoke]">OR</p>
              <div className="h-[1px] bg-white w-[70%]"></div>
            </div>

            {/* <p className="text-center text-[whitesmoke]">OR</p> */}
            <p className="text-center text-[whitesmoke]">
              Already have an account?
              <span
                className="text-[#aad1a9] cursor-pointer"
                onClick={() => navigate("/login")}
              >
                {" "}
                Login
              </span>
            </p>
          </div>

          <div>
            <img src={svgImage} className=""></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
