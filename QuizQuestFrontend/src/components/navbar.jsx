import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function FloatingNav({ navItems, className }) {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : 0,
          opacity: visible ? 1 : 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-white border-opacity-30 rounded-full bg-white bg-opacity-20 shadow-lg backdrop-blur-sm  z-[5000] px-6 py-4 gap-10 items-center space-x-4",

          className
        )}
      >
        <div className="w-72 h-full relative">
          <div className="rounded-full absolute border-green-600 border-solid border-2 top-[50%] translate-y-[-50%] w-12 h-12">
            {" "}
            <div className="logo"></div>
          </div>
        </div>
        <div className="flex justify-end items-center w-fit pl-11 gap-6">
          {" "}
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`} 
              to={navItem.link} 
              className={cn("relative text-white items-center BG flex space-x-1")}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex w-fit justify-between gap-8 pr-6">
          <button className="relative text-sm bg-[#cff466] text-black w-fit px-10 py-2 rounded-full">
            <span>EXPLORE</span>
          </button>
          <button className="relative text-sm bg-[#cff466] text-black min-w-fit px-10 py-2 rounded-full" onClick={()=> navigate("/login")}>
            <span>LOG IN</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

FloatingNav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

FloatingNav.defaultProps = {
  className: "",
};
