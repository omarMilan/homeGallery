import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpeechBubble from "../components/SpeechBubble";
import assistant from "../assets/catAssistant.png";

export default function AddPage() {
  const [opening, setOpening] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpening(false); // Remove panels after 1s
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-Primary flex items-center justify-center overflow-hidden">
      <div className="flex-col ">
        <div className="flex flex-row items-center gap-x-[0px] transition-all duration-300 md:gap-x-[60px] lg:gap-x-[80px] xl:gap-x-[100px]">
          <img src={assistant} className="max-w-[90%] w-[208px]" />
          <SpeechBubble
            text="Tap here to upload new 
memories—photos or videos, it’s
 all welcome!"
          />
        </div>
      </div>

      {opening && (
        <>
          {/* Top Panel opens upward (disappears) */}
          <motion.div
            initial={{ height: "50%" }}
            animate={{ height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full bg-black z-50"
          />

          {/* Bottom Panel opens downward (disappears) */}
          <motion.div
            initial={{ height: "50%" }}
            animate={{ height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-full bg-black z-50"
          />
        </>
      )}
    </div>
  );
}
