import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [showClosingAnimation, setShowClosingAnimation] = useState(false);
  const navigate = useNavigate();

  const secretPassword = "Home";

  const handlePassword = () => {
    if (password === secretPassword) {
      setShowClosingAnimation(true);
      setTimeout(() => {
        navigate("/Home");
      }, 1000); // wait for animation to finish
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="absolute w-full h-screen flex items-center justify-center bg-Primary overflow-hidden flex-col gap-y-[28px]">
      <div className="font-PrimaryFont text-[30px] font-normal">Locked</div>
      {/* Input Box */}
      <motion.div
        key={shake}
        animate={shake ? { x: [-10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="z-10 w-[90%] max-w-[350px] h-[41px] rounded-[4px] border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,.3)]"
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlePassword();
          }}
          className="h-full w-full outline-none px-2"
          placeholder="Enter password"
        />
      </motion.div>

      {/* Closing Top Panel */}
      {showClosingAnimation && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "50%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full bg-black z-20"
        />
      )}

      {/* Closing Bottom Panel */}
      {showClosingAnimation && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "50%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full bg-black z-20"
        />
      )}
    </div>
  );
}
