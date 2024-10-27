import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import image from "../../assets/spotlight.svg";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-10 bg-black"
      ref={containerRef}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto py-12 px-4 md:px-8 lg:px-10">
        <h2 className="text-4xl md:text-6xl font-bold text-[#FFFFFF]">
          How to join the <span className="text-[#CFF466]">Quiz</span>
        </h2>
        <p className="leading-7 mt-3 mb-0 text-lg md:text-xl font-semibold text-[#bebdbd]">
          Welcome to Quiz Quest, lets take you thorugh a guide on how to join
          the quizzes.
        </p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-12">
        {data.map((item, index) => (
          <div key={index} className="flex ">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div
                className="h-8 absolute left-4  w-8 rounded-full flex items-center justify-center"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Outer glow ring */}
                <div className="absolute w-full h-full rounded-full bg-[#CFF466] opacity-20 animate-pulse" />

                {/* Middle ring */}
                <div className="absolute w-5 h-5 rounded-full border-2 border-[#CFF466] opacity-60" />

                {/* Inner circle with gradient */}
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#CFF466] to-green-400 shadow-lg shadow-[#CFF466]/50">
                  {/* Center dot */}
                  <div className="w-1 h-1 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </motion.div>
              <h3 className="hidden md:block text-lg md:text-4xl font-bold text-neutral-500 dark:text-neutral-500 md:pl-16">
                {item.title.split(" ")[0]}{" "}
                <span className="text-[#CFF466]">
                  {item.title.split(" ")[1]}
                </span>
              </h3>
            </div>
            <CardContainer className="inter-var">
              <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-white/[0.1] w-auto h-auto rounded-xl border-white bg-neutral-800 p-4">
                <CardItem
                  translateZ="50"
                  className="hidden md:block text-lg md:text-4xl font-bold text-white dark:text-neutral-500"
                >
                  {item.content}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                ></CardItem>
                <CardItem
                  translateZ="100"
                  className="w-full mt-3 flex items-center justify-center"
                >
                  {item.img}
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-green-600 via-green-700 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
