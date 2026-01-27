import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoVideo from "@assets/codequity logo_grahic_1756284584793.mp4";

interface VideoPreloaderProps {
  onLoadingComplete: () => void;
}

export default function VideoPreloader({ onLoadingComplete }: VideoPreloaderProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    // Safety fallback: if video hasn't loaded/ended in 5 seconds, force complete
    const fallbackTimer = setTimeout(() => {
      console.log("Preloader: Fallback triggered (5s timeout)");
      onLoadingComplete();
    }, 5000);

    if (video) {
      // Ensure video plays automatically
      video.play().catch(err => {
        console.warn("Preloader: Video play failed, skipping...", err);
        onLoadingComplete();
      });

      const handleVideoEnd = () => {
        setVideoEnded(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 800);
        }, 500);
      };

      video.addEventListener('ended', handleVideoEnd);
      video.addEventListener('error', () => {
        console.error("Preloader: Video error, skipping...");
        onLoadingComplete();
      });

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        clearTimeout(fallbackTimer);
      };
    } else {
      onLoadingComplete();
    }
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          data-testid="video-preloader"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 circuit-pattern opacity-20"></div>

          {/* Video Container */}
          <motion.div
            className="relative z-10 w-full h-full flex items-center justify-center"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <video
              ref={videoRef}
              className="max-w-[80vw] max-h-[80vh] object-contain"
              autoPlay
              muted
              playsInline
              preload="metadata"
              data-testid="preloader-video"
            >
              <source src={logoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Skip Button */}
          <motion.button
            onClick={() => {
              setVideoEnded(true);
              setFadeOut(true);
              setTimeout(onLoadingComplete, 200);
            }}
            className="absolute bottom-8 right-8 px-4 py-2 text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            data-testid="skip-button"
          >
            Skip →
          </motion.button>

          {/* Loading Dots Animation (backup visual) */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}