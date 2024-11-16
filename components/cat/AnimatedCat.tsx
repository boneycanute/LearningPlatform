import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export const AnimatedCat = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  const calculateEyePosition = useCallback(
    (mouseX: number, mouseY: number, eyeBaseX: number, eyeBaseY: number) => {
      const maxMove = 8;
      const dx = mouseX - eyeBaseX;
      const dy = mouseY - eyeBaseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      return {
        x: Math.cos(angle) * Math.min(distance / 30, maxMove),
        y: Math.sin(angle) * Math.min(distance / 30, maxMove),
      };
    },
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const leftEyeBase = { x: 146, y: 166 };
    const rightEyeBase = { x: 297, y: 166 };

    setEyePosition({
      left: calculateEyePosition(
        mousePosition.x,
        mousePosition.y,
        leftEyeBase.x,
        leftEyeBase.y
      ),
      right: calculateEyePosition(
        mousePosition.x,
        mousePosition.y,
        rightEyeBase.x,
        rightEyeBase.y
      ),
    });
  }, [mousePosition, calculateEyePosition]);

  const getParallaxStyle = (depth = 1) => {
    const moveX = (mousePosition.x - window.innerWidth / 2) * 0.01 * depth;
    const moveY = (mousePosition.y - window.innerHeight / 2) * 0.01 * depth;
    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
      transition: "transform 0.1s ease-out",
    };
  };

  const idleAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror" as const,
    },
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      <motion.div
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        animate={idleAnimation}
      >
        <div className="relative w-[500px] h-[500px]">
          <motion.div
            drag="x"
            dragConstraints={{ left: -20, right: 20 }}
            dragElastic={0.05}
            dragMomentum={false}
            whileDrag={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="cursor-grab"
          >
            <div className="relative w-[500px] h-[500px]">
              <div
                className="absolute inset-0 blur-[120px] opacity-20 bg-[#e2b1eb] rounded-full"
                style={{
                  transform: "scale(.65) translatey(70px)", // Adjust size of the glow
                  filter: "blur(100px)", // Additional blur effect
                }}
              />
              {/* Base Layer */}
              <div className="absolute inset-0" style={getParallaxStyle(0.5)}>
                <svg viewBox="0 0 434.66 422.28" className="w-full h-full">
                  <path
                    className="fill-[#24273a]"
                    d="M12.44,214.42c-3.83-.7-6.78-2.66-5.9-6.86.78-3.72,3.51-5.78,7.76-5.13,6.7,1.03,13.04-.69,19.32-2.94-8.72-.26-17.39-.61-25.72-3.4-5.2-1.74-7.2-4.71-5.54-8.72,1.85-4.46,5.44-3.98,9.24-2.8,7.66,2.39,15.44,3.43,23.47,1.45-8.97-3.56-18.25-5.84-27.82-6.82-5.11-.53-7.44-2.31-7.24-6.19.19-3.84,3.48-6.28,8.37-5.79,8.78.87,17.35,2.92,25.82,5.31,2.08.59,3.41,1.06,3.78-1.82,1.38-10.85,2.89-21.69,4.36-32.53,3.62-18.22,6.55-36.57,10.89-54.65,4.97-20.69,10.34-41.25,19.21-60.69,3.04-6.65,6.53-13.11,11.9-18.28,5.75-5.53,11.48-5.95,17.84-1.09,10.12,7.73,16.9,18.19,23.05,29.06,7.32,12.92,12.62,26.68,16.05,41.12.58,2.44,1.15,3.92,4.07,3.56,28.56-3.55,57.26-4.2,86-4.17,20.08.55,40.12,1.73,60.08,4.09,2.4.28,3.36-.38,4-2.98,5.72-23.18,15.12-44.65,30.91-62.84,13.7-15.77,22.52-15.08,33.05,2.29,9.83,16.21,15.01,34.32,19.86,52.44,8.89,33.24,14.76,67.08,19.08,101.19.59,4.63,1.81,5.86,6.47,4.24,6.42-2.24,13.21-3.28,19.97-4.1,1.64-.2,3.41-.45,4.96-.04,3.22.83,5.15,3.11,4.91,6.55-.23,3.26-2.22,5.09-5.53,5.28-8.34.5-16.38,2.49-24.34,4.84-1.29.38-3.6.02-3.25,1.99.31,1.7,2.51,1.15,3.95,1.15,6,0,11.91-.68,17.65-2.58,4.87-1.61,8.56-.35,9.56,3.19,1.05,3.67-1.06,6.73-5.82,8.35-7.8,2.66-15.92,3.08-25.45,3.17,6.66,3.21,12.44,3.61,18.33,3.25,4.99-.31,7.68,1.31,8.08,5.1.41,3.94-1.77,6.25-6.7,6.9-5.62.75-11.18-.18-17.11-1.18,1.17,13.15,2.31,25.98,3.45,38.81,1.9,27.83,3.62,55.65,3.36,83.59-.38,39.54-26.58,73.84-64.88,83.81-6.44,1.68-12.99,2.61-19.71,2.6-39.96-.02-79.92.07-119.88.13-31.79-.06-63.58-.14-95.37-.16-40.73-.03-77.37-31.43-83.6-71.67-2.38-15.38-1.1-30.87-1.38-46.31.79-13.36,1.51-26.72,2.4-40.07.74-11.09,1.21-22.2,2.88-33.23.71-4.68.65-9.47,1.14-14.19.34-3.29-.9-4.12-3.91-3.2-1.71.52-3.5.79-5.26,1.18-3.6-.07-7.21.28-10.8-.19v-.02Z"
                  />
                  <path
                    className="fill-[#c9a2f4]"
                    d="M12.44,214.42c3.6.06,7.2.13,10.8.19-3.62.82-7.22,1.09-10.8-.19Z"
                  />
                  <path
                    className="fill-[#daacee]"
                    d="M193.34,166.56c0,25.92-21.4,49.1-47.26,50.01-22.53.79-38.02-15.9-39.21-36.8-1.39-24.6,16.13-47.17,40.13-52.44,24.82-5.44,46.34,12.77,46.33,39.23h.01Z"
                  />
                  <path
                    className="fill-[#e2b1eb]"
                    d="M241.33,166.18c0-30.54,28.53-48.41,56.58-35.44,18.7,8.65,30.75,28.33,29.94,48.91-1.06,26.99-27.17,43.74-53.24,34.16-19.52-7.17-33.29-26.87-33.29-47.63h0Z"
                  />
                  <path
                    className="fill-[#ddaeed]"
                    d="M80.02,88.8c1.7-14.19,3.2-28.01,9.24-40.83.7-1.49,1.56-2.95,2.6-4.23,2.94-3.63,5.56-3.64,8.44.11,5.05,6.59,7.14,14.54,9.64,22.25,1.32,4.07,3.91,9.03,2.61,12.24-.97,2.38-7.24,2.76-11.23,3.74-7.09,1.74-13.94,4.23-21.3,6.73h0Z"
                  />
                  <path
                    className="fill-[#e9b5e9]"
                    d="M353.48,88.87c-10.81-4.1-21.05-6.86-31.35-9.4-1.79-.44-2.04-1.35-1.6-2.87,2.8-9.72,5.3-19.56,9.92-28.62,1.47-2.87,2.92-6.73,6.69-6.73,4.19,0,5.94,3.95,7.41,7.23,5.64,12.57,7.18,26.07,8.93,40.4h0Z"
                  />
                  <path
                    className="fill-[#dcaeed]"
                    d="M233.89,221.73c-5.96-.03-11.11-1.96-14.79-6.81-1.48-1.95-2.12-1.59-3.6.06-5.9,6.58-14.81,8.58-22.63,5.35-6.17-2.55-9.63-8.86-8.53-15.32.4-2.35,1.9-3.69,3.99-3.7,2.2-.01,3.99,1.65,3.72,3.85-.68,5.45,1.69,8.12,6.87,8.85,5.47.77,10.27-1.49,12.16-6.52,1.71-4.57,4.91-9.54-1.49-13.54-2.26-1.42-1.36-3.38.6-4.82,3.35-2.47,10.83-2.47,14.24-.04,2.61,1.86,2.3,3.51.15,5.61-3.92,3.82-3.51,10.84.72,15.72,3.23,3.72,10.79,4.96,14.65,2.28,2.26-1.57,2.92-3.98,2.81-6.59-.12-2.72.89-4.89,3.73-4.78,2.59.09,3.77,2.02,3.9,4.82.42,9.49-5.99,15.65-16.49,15.59h0Z"
                  />
                </svg>
              </div>

              {/* Top Layer (Eyes, Arrow, Hyphen) */}
              <div className="absolute inset-0" style={getParallaxStyle(1)}>
                {/* Left Eye */}
                <div
                  className="absolute"
                  style={{
                    left: "146px",
                    top: "166px",
                    transform: `translate(${eyePosition.left.x}px, ${eyePosition.left.y}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <svg viewBox="0 0 56.44 55.89" className="w-12 h-12">
                    <path
                      className="fill-[#24273a]"
                      d="M28.48,0C44.43,0,56.48,12.11,56.44,28.07c-.03,15.88-12.15,27.83-28.2,27.82C12.18,55.88.09,43.98,0,28.09-.08,12.06,12.15-.01,28.47,0h.01Z"
                    />
                  </svg>
                </div>

                {/* Right Eye */}
                <div
                  className="absolute"
                  style={{
                    left: "297px",
                    top: "166px",
                    transform: `translate(${eyePosition.right.x}px, ${eyePosition.right.y}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <svg viewBox="0 0 56.44 55.89" className="w-12 h-12">
                    <path
                      className="fill-[#24273a]"
                      d="M28.48,0C44.43,0,56.48,12.11,56.44,28.07c-.03,15.88-12.15,27.83-28.2,27.82C12.18,55.88.09,43.98,0,28.09-.08,12.06,12.15-.01,28.47,0h.01Z"
                    />
                  </svg>
                </div>

                {/* Arrow */}
                <div
                  className="absolute"
                  style={{ left: "180px", bottom: "100px" }}
                >
                  <svg viewBox="0 0 56.49 84.58" className="w-8 h-12">
                    <path
                      className="fill-[#d7aaef]"
                      d="M39.56,42c-.89-.83-1.79-1.77-2.79-2.57C26.06,30.81,15.52,21.98,4.56,13.71-1.96,8.79-.11,6.05,5.53.85c1.6-1.48,3.4-.84,4.95.44,14.3,11.84,28.69,23.58,42.86,35.58,4.43,3.75,4.07,7.64-.38,11.28-13.59,11.13-27.21,22.23-40.84,33.31-5.19,4.22-6.27,4.15-9.71-.16-3.57-4.47-3.36-5.8,1.84-10.03,10.94-8.9,21.89-17.77,32.88-26.6.91-.73,1.91-1.3,2.44-2.66h-.01Z"
                    />
                  </svg>
                </div>

                {/* Hyphen */}
                <div
                  className="absolute"
                  style={{ left: "240px", bottom: "100px" }}
                >
                  <svg viewBox="0 0 67.61 12.17" className="w-12 h-3">
                    <path
                      className="fill-[#d6a9ed]"
                      d="M33.75.04C42.91.04,52.06.11,61.22,0c4.06-.05,6.39,1.54,6.39,5.75,0,3.98-2.02,6.36-6.05,6.37-18.64.07-37.29.06-55.94,0C1.03,12.1-.09,9.24,0,5.1.11,1.01,2.31.02,5.78.03,15.1.07,24.43.04,33.75.03h0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
