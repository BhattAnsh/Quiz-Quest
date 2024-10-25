import React from "react";
import { BiSolidUserCheck, BiSolidUserPlus } from "react-icons/bi";
import { FaFacebookF, FaDiscord, FaXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";




export default function ProfileDashboard() {
  const quizData = [
    { name: "Quiz 1", link: "/quiz/1", participants: 20 },
    { name: "Quiz 2", link: "/quiz/2", participants: 35 },
    { name: "Quiz 3", link: "/quiz/3", participants: 50 },
    { name: "Quiz 4", link: "/quiz/4", participants: 15 },
    { name: "Quiz 5", link: "/quiz/5", participants: 42 },
  ];
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#1A1A19]">
    <div className="flex flex-col md:flex-row gap-10 w-full md:w-10/12 md:mt-20 mt-32 px-4 md:px-0">
      
      {/* Profile Card Section */}
      <div className="border-2 border-green-800 w-full md:w-1/4 flex-wrap text-white pt-4 px-6 rounded-3xl gap-5 flex flex-col items-center shadow-md shadow-green-400 ">
        <div className="flex items-center gap-3  w-full">
          <div className="border-2 border-green-700 rounded-full p-2">
            <img
              src="https://freesvg.org/img/publicdomainq-0006224bvmrqd.png"
              className="w-14 h-14 rounded-full"
            />
          </div>
          <div className="flex flex-col  md:items-start ">
            <h1 className="font-bold text-lg">Bhumika Sharma</h1>
            <p className="text-gray-300">India</p>
          </div>
        </div>
        
        <div className="flex gap-5 mt-3 w-full">
          <div className="flex flex-col gap-1 border-2 border-green-700 py-4 rounded-3xl items-center justify-center w-1/2">
            <BiSolidUserCheck size={32} className="ml-3 text-[#CFF466]" />
            <p className="font-semibold">263</p>
            <p className="text-gray-300 text-sm">Followings</p>
          </div>
          <div className="flex flex-col gap-1 border-2 border-green-700 py-4 rounded-3xl items-center justify-center w-1/2">
            <BiSolidUserPlus size={32} className="ml-3 text-yellow-400" />
            <p className="font-semibold">300</p>
            <p className="text-gray-300 text-sm">Followers</p>
          </div>
        </div>
  
        {/* About Me Section */}
        <div className="flex flex-col mt-5 w-full">
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">About me</h1>
            <p className="text-sm text-gray-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, minus?
            </p>
          </div>
          <div className="flex gap-6 mt-5">
            <h1 className="font-semibold">Mobile</h1>
            <p className="text-gray-300">1234566789</p>
          </div>
          <div className="flex gap-9">
            <h1 className="font-semibold">Email</h1>
            <p className="text-gray-300">name@gmail.com</p>
          </div>
        </div>
  
        {/* Social Icons */}
        <div className="flex gap-4 justify-center mt-5 border-t-2  p-4 items-center w-full">
          <div className="border-2 rounded-full p-1.5 hover:text-green-500 hover:border-green-500 transition-all duration-500 hover:-translate-y-1 cursor:pointer">
            <FaFacebookF size={20} />
          </div>
          <div className="border-2 rounded-full p-1.5 hover:text-green-500 hover:border-green-500 transition-all duration-500 hover:-translate-y-1 cursor:pointer">
            <FaDiscord size={20} />
          </div>
          <div className="border-2 rounded-full p-1.5 hover:text-green-500 hover:border-green-500 transition-all duration-500 hover:-translate-y-1 cursor:pointer">
            <PiInstagramLogoFill size={20} />
          </div>
          <div className="border-2 rounded-full p-1.5 hover:text-green-500 hover:border-green-500 transition-all duration-500 hover:-translate-y-1 cursor:pointer">
            <FaXTwitter size={20} />
          </div>
        </div>
      </div>
  
      {/* Right Section */}
      <div className="flex flex-col w-full md:w-3/4 gap-4">
        
        {/* Create A Quiz Section */}
        <div className="border-2 border-green-700 w-full flex px-4 py-6 justify-between items-center rounded-3xl gap-2 shadow-md shadow-green-400">
          <div className="flex flex-col gap-2">
            <h1 className="text-white font-bold md:text-2xl text-lg flex items-center gap-1">
              <IoCreate />Create A Quiz
            </h1>
            <p className="text-green-200 md:text-base text-sm md:font-medium">
              Unlock your full potential by creating an amazing quiz and make every moment count.
            </p>
          </div>
          <button className="bg-green-500 rounded-3xl hover:bg-green-600 md:px-6 px-2 min-w-fit py-2 hover:text-white md:text-sm text-xs text-green-950 font-semibold transition-all duration-500">
            Start here
          </button>
        </div>
  
        {/* History Section */}
        <div className="border-2 border-green-700 w-full flex flex-col px-4 py-8 justify-between rounded-3xl shadow-md shadow-green-400">
  <h1 className="flex items-center gap-1 font-bold text-white text-2xl border-b-2 pb-3 border-[#1d3122] ml-4">
    <FaHistory />History
  </h1>

  {quizData && quizData.length > 0 ? (
    <table className="min-w-full table-auto mt-4 text-center text-white ">
      <thead>
        <tr className="md:text-xl">
          <th className="px-4 py-2">Quiz Name</th>
          <th className="px-4 py-2">Link</th>
          <th className="px-4 py-2">Participants Count</th>
        </tr>
      </thead>
      <tbody>
        {quizData.map((quiz, index) => (
          <tr
            key={index}
            className="border-b-2 pb-3 border-[#1d3122] text-sm md:text-md"
          >
            <td className="px-4 py-3">{quiz.name}</td>
            <td className="px-4 py-3">
              <a
                href={quiz.link}
                className="hover:text-green-300 flex items-center justify-center gap-1 text-gray-200"
              >
                Visit <BsBoxArrowUpRight />
              </a>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-center gap-1">
              {quiz.participants} <HiUsers />
                </div></td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="w-full min-h-full py-32 flex justify-center items-center">
      <FaCirclePlus
        size={50}
        className="text-green-950 hover:text-green-700 transition-all duration-300 cursor-pointer"
      />
    </div>
  )}
</div>

      </div>
    </div>
  </div>
  
  );
}
