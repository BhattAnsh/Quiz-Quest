import svg from "../assets/spotlight.svg";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="h-screen w-screen md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col justify-center items-center h-full w-full"
      >
        <img src={svg} alt="spotlight" className="absolute top-0 left-0" />
      </motion.div>
    </div>
  );
}
