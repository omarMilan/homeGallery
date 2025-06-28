import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpeechBubble from "../components/SpeechBubble";
import assistant from "../assets/catAssistant.png";
import WebButton from "../components/webButton";
import axios from "axios";

export default function AddPage() {
  const [opening, setOpening] = useState(true);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setOpening(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));
    try {
      await axios.post("http://localhost:3001/upload", formData);
      alert("Upload successful!");
    } catch (err) {
      alert("Upload failed.");
    }
  };

  return (
    <div className="relative w-full h-screen bg-Primary flex items-center justify-center overflow-hidden">
      <div className="flex-col items-center justify-center flex">
        <div className="flex flex-row items-center gap-x-[0px] transition-all duration-300 md:gap-x-[60px] lg:gap-x-[80px] xl:gap-x-[100px]">
          <img src={assistant} className="max-w-[90%] ml-10 w-[208px]" />
          <SpeechBubble text="Tap here to upload new memories—photos or videos, it’s all welcome!" />
        </div>
        <div className="flex flex-col items-start gap-x-4 mt-10 ml-[30px]">
          <WebButton name="Back" />

          <label
            htmlFor="upload"
            className="z-10 w-[75vw] mt-10 h-[30vh] rounded-[4px] flex items-center justify-center border-[3px] transition-all duration-300 cursor-pointer border-black font-PrimaryFont font-bold select-none text-[50px] bg-Add shadow-[4px_4px_0px_0px_rgba(0,0,0,.3)]"
          >
            +
            <input
              id="upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleUpload}
              accept="image/*,video/*"
            />
          </label>
        </div>
      </div>

      {opening && (
        <>
          <motion.div
            initial={{ height: "50%" }}
            animate={{ height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full bg-black z-50"
          />
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
