import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import assistant from "../assets/catAssistant.png";
import WebButton from "../components/webButton";
import SpeechBubble from "../components/SpeechBubble";

export default function HomePage() {
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOpeningAnimation(false);
    }, 1000); // match closing animation timing
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-Primary flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="flex-col flex items-center justify-center">
        <div className="flex flex-row items-center gap-x-[0px] transition-all duration-300 md:gap-x-[60px] lg:gap-x-[80px] xl:gap-x-[100px]">
          <img src={assistant} className="max-w-[90%] ml-10 w-[208px]" />
          <SpeechBubble text="Welcome to your gallery menu" />
        </div>

        <div className="flex items-center justify-center mt-[45px] text-[28px] font-normal font-PrimaryFont">
          Gallery
        </div>
        <div className="items-center justify-center flex mt-[45px] max-sm:flex-col flex-row transition-all duration-300 gap-x-[10%] gap-y-[20px]">
          <WebButton name="+ Add" />
          <WebButton name="View" />
          <WebButton name="- Delete" />
        </div>
      </div>

      {/* Opening Top Panel */}
      {showOpeningAnimation && (
        <motion.div
          initial={{ height: "50%" }}
          animate={{ height: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full bg-black z-20"
        />
      )}

      {/* Opening Bottom Panel */}
      {showOpeningAnimation && (
        <motion.div
          initial={{ height: "50%" }}
          animate={{ height: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full bg-black z-20"
        />
      )}
    </div>
  );
}
