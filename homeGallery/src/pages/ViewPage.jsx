import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpeechBubble from "../components/SpeechBubble";
import assistant from "../assets/catAssistant.png";
import WebButton from "../components/webButton";
import axios from "axios";

const backendBaseUrl = "http://192.168.0.27:3001"; // your computer's IP

export default function ViewPage() {
  const [opening, setOpening] = useState(true);
  const [gallery, setGallery] = useState([]);
  const [fullscreenSrc, setFullscreenSrc] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpening(false), 1000);
    axios.get(`${backendBaseUrl}/gallery`).then((res) => {
      const sorted = res.data.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      setGallery(sorted);
    });
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-Primary flex flex-col items-center justify-start overflow-y-scroll pt-20 pb-10">
      <div className="flex-col items-center justify-center flex">
        <div className="flex flex-row items-center gap-x-[0px] transition-all duration-300 md:gap-x-[60px] lg:gap-x-[80px] xl:gap-x-[100px]">
          <img src={assistant} className="max-w-[90%] ml-10 w-[208px]" />
          <SpeechBubble text="Take a look at your memories!" />
        </div>

        <div className="flex flex-col items-start gap-x-4 mt-10 ml-[30px]">
          <WebButton name="Back" />

          <div className="z-10 w-[75vw] mt-10 min-h-[30vh] rounded-[4px] border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,.3)] p-4 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-6 w-full">
              {gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="relative border-Primary border-2 rounded-md overflow-hidden cursor-pointer hover:scale-105 transition transform"
                  style={{ aspectRatio: "4 / 3", minWidth: "120px" }}
                  onClick={() =>
                    setFullscreenSrc(`${backendBaseUrl}${item.url}`)
                  }
                >
                  {item.url.endsWith(".mp4") ? (
                    <video
                      src={`${backendBaseUrl}${item.url}`}
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <img
                      src={`${backendBaseUrl}${item.url}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {fullscreenSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center"
          onClick={() => setFullscreenSrc(null)}
        >
          {fullscreenSrc.endsWith(".mp4") ? (
            <video
              src={fullscreenSrc}
              controls
              autoPlay
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
            />
          ) : (
            <img
              src={fullscreenSrc}
              alt="fullscreen"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
            />
          )}
        </div>
      )}

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
