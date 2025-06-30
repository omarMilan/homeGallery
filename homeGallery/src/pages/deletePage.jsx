import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpeechBubble from "../components/SpeechBubble";
import assistant from "../assets/catAssistant.png";
import WebButton from "../components/webButton";
import axios from "axios";

export default function DeletePage() {
  const [opening, setOpening] = useState(true);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setOpening(false), 1000);
    loadGallery();
    return () => clearTimeout(timer);
  }, []);

  const loadGallery = () => {
    axios.get("http://localhost:3001/gallery").then((res) => {
      // Sort by createdAt descending if available, else by name
      const sorted = res.data.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        if (dateA && dateB && !isNaN(dateA) && !isNaN(dateB)) {
          return dateB - dateA;
        }
        return b.name.localeCompare(a.name);
      });
      setGallery(sorted);
    });
  };

  const handleDelete = async (filename) => {
    const confirmDelete = window.confirm(`Delete "${filename}"?`);
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3001/delete/${filename}`);
      loadGallery();
    } catch {
      alert("Failed to delete.");
    }
  };

  const currentYear = new Date().getFullYear();

  const groupedGallery = gallery.reduce((acc, item) => {
    const dateStr = item.createdAt;
    const parsedDate = new Date(dateStr);
    const yearNum = !isNaN(parsedDate) ? parsedDate.getFullYear() : null;
    const year =
      yearNum && yearNum >= 1900 && yearNum <= currentYear
        ? String(yearNum)
        : "Unknown";

    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});

  const sortedYears = Object.entries(groupedGallery).sort(([a], [b]) =>
    b.localeCompare(a)
  );

  return (
    <div className="relative w-full h-screen bg-Primary flex flex-col items-center justify-start overflow-y-scroll pt-20 pb-10">
      <div className="flex-col items-center justify-center flex">
        <div className="flex flex-row items-center gap-x-[0px] transition-all duration-300 md:gap-x-[60px] lg:gap-x-[80px] xl:gap-x-[100px]">
          <img src={assistant} className="max-w-[90%] ml-10 w-[208px]" />
          <SpeechBubble text={"Deleting a memory? \nTap here to delete it."} />
        </div>

        <div className="flex flex-col items-start gap-x-4 mt-10 ml-[30px]">
          <WebButton name="Back" />

          <div className="z-10 w-[75vw] mt-10 min-h-[30vh] max-h-[60vh] overflow-y-auto rounded-[4px] border-[3px] border-black bg-Delete p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,.3)]">
            {sortedYears.map(([year, items]) => (
              <div key={year} className="w-full mb-8">
                <h2 className="text-xl font-bold text-blue-500 mb-4">{year}</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-6 w-full">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleDelete(item.name)}
                      className="relative border border-black rounded-md overflow-hidden cursor-pointer hover:scale-105 transition transform"
                      style={{ aspectRatio: "4 / 3", minWidth: "120px" }}
                      title={`Click to delete ${item.name}`}
                    >
                      {item.url.endsWith(".mp4") ? (
                        <video
                          src={`http://localhost:3001${item.url}`}
                          className="w-full h-full object-cover"
                          muted
                        />
                      ) : (
                        <img
                          src={`http://localhost:3001${item.url}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
