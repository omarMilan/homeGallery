import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function WebButton({ name }) {
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClosing(true);

    // Navigate after 1s, matching the other pages
    setTimeout(() => {
      if (name === "+ Add") {
        navigate("/AddPage");
      } else if (name === "View") {
        navigate("/ViewPage");
      } else if (name === "- Delete") {
        navigate("/DeletePage");
      }
    }, 1000);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={closing}
        className="z-10 w-[90%] max-w-[185px] h-[84px] rounded-[4px] flex items-center justify-center border-[3px] hover:bg-Primary transition-all duration-300 cursor-pointer border-black font-PrimaryFont font-medium select-none text-[20px] bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,.3)]"
      >
        {name}
      </button>

      {closing && (
        <>
          {/* Top Closing Panel */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "50%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full bg-black z-50"
          />
          {/* Bottom Closing Panel */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "50%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 w-full bg-black z-50"
          />
        </>
      )}
    </>
  );
}
