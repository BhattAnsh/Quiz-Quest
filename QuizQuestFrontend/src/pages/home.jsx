import svg from "../assets/spotlight.svg";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center items-center h-full w-full"
        >
          <img src={svg} alt="spotlight" className="absolute top-44 md:top-0 scale-150 rotate-90 md:rotate-0 md:scale-100  md:left-0 " />
          <div className="relative h-screen w-[100vw] ">
            <div className="flex items-center h-full w-full pl-7 md:absolute md:left-60 mt-10 ">
              <div className="flex flex-col gap-6 w-full md:w-1/2 ">
                <div>
                  <h1 className="text-[5.3rem] leading-[5rem] md:text-7xl font-bold text-[#FFFFFF]">
                    <span className="text-[#CFF466]">QUIZ</span> QUEST
                  </h1>
                </div>
                <div className="w-5/6 md:w-[24vw]">
                  <p className="leading-8 md:leading-7 text-[2rem] md:text-xl font-semibold  text-[#bebdbd]">
                    Where knowledge meets fun - build, join, and host quizzes
                    with a community of quiz enthusiasts!
                  </p>
                </div>
                <div className="border-2 bg-[#CFF466] border-[#CFF466] rounded-lg py-2 text-center w-40 mt-1">
                  <button className="text-[#1E5128] text-md">Create Now</button>
                </div>
              </div>

              <div className="border border-[#7e9442] shadow-[1px_1px_20px_0.1px__rgba(207,244,102,1)]  overflow-hidden  rounded-xl w-0 h-0 md:h-[60vh] md:w-[70vw] relative">
                <img
                  src="/images/quiz.jpg"
                  alt="img"
                  className="absolute top-0  w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
