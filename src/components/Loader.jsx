import { useRef, useEffect, useState } from "react";
import { loadingVideo, background } from "../assets/assets";

export default function Loader({ onComplete }) {
  const videoRef = useRef(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = background;
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }

    // Safety fallback: ensure loader dismisses within 2.5s even if video fails to play/end
    const fallbackTimer = setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(fallbackTimer);
  }, [onComplete]);

  const handleVideoEnd = () => {
    setFading(true);
    setTimeout(onComplete, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src={loadingVideo}
        className="max-w-full max-h-full w-full h-auto object-contain"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onError={handleVideoEnd}
      />
      {/* Hidden image element to ensure browser caches it */}
      <img src={background} className="hidden" alt="Preload" />
    </div>
  );
}
