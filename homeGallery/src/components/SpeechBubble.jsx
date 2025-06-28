import { useEffect, useState } from "react";

export default function SpeechBubble({ text, mute = false }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;
    const delay = 35; // Faster: 50ms between letters
    setVisibleText("");

    const audioCtx = !mute
      ? new (window.AudioContext || window.webkitAudioContext)()
      : null;

    const interval = setInterval(() => {
      if (index >= text.length) {
        clearInterval(interval);
        return;
      }

      const nextChar = text[index];
      setVisibleText((prev) => prev + nextChar);

      if (audioCtx && /[a-zA-Z]/.test(nextChar)) {
        const pitch = 600 + Math.random() * 300;
        const duration = 0.05;
        const volume = 0.25;

        const oscillator = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);

        gain.gain.setValueAtTime(volume, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          audioCtx.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(audioCtx.destination);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration);
      }

      index++;
    }, delay);

    return () => {
      clearInterval(interval);
      if (audioCtx) audioCtx.close();
    };
  }, [text, mute]);

  return (
    <div className="z-10 max-w-[40%] w-[350px] text-[16px] h-[161px] rounded-[4px] border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,.3)] text-center mr-10 px-2 font-PrimaryFont font-semibold flex items-center justify-center">
      {visibleText}
    </div>
  );
}
