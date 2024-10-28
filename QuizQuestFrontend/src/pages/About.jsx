import React from "react";
import { Timeline } from "@/components/ui/Timeline";
import signUp from "../images/signupss.png";
import image from "../assets/spotlight.svg";
const About = () => {
  const data = [
    {
      title: "Step 1",
      content: (
        <div className="text-white flex flex-col gap-4">
          <h1 className="text-[2rem] md:text-5xl font-semibold  z-10 text-[#bebdbd]">
            Create a <span className="text-[#CFF466]">Quiz Quest</span> Acoount
          </h1>
        </div>
      ),
      img: (
        <img
          src={signUp}
          alt="startup template"
          width={600}
          height={600}
          className="rounded-lg "
        />
      ),
      description: "Create a Quiz Quest Account by signing up with your email",
    },
    {
      title: "Step 2",
      content: (
        <div className="text-white flex flex-col gap-4">
          <h1 className="text-[2rem] md:text-5xl font-semibold  z-10 text-[#bebdbd]">
            Search for <span className="text-[#CFF466]">Quizes</span>
          </h1>
          <div className="">
            <img
              src={signUp}
              alt="startup template"
              width={600}
              height={600}
              className="rounded-lg "
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div className="text-white flex flex-col gap-4">
          <h1 className="text-[2rem] md:text-5xl font-semibold  z-10 text-[#bebdbd]">
            Get a <span className="text-[#CFF466]">Joining</span> Link
          </h1>
          <div className="">
            <img
              src={signUp}
              alt="startup template"
              width={600}
              height={600}
              className="rounded-lg "
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div className="text-white flex flex-col gap-4">
          <h1 className="text-[2rem] md:text-5xl font-semibold  z-10 text-[#bebdbd]">
            Play <span className="text-[#CFF466]">Quizes</span>
          </h1>
          <div className="">
            <img
              src={signUp}
              alt="startup template"
              width={600}
              height={600}
              className="rounded-lg "
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full h-fit bg-[url(../assets/spotlight.svg)]">
      <img src={image} alt="" className="fixed" />
      <Timeline data={data} />
    </div>
  );
};

export default About;
