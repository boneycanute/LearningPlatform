import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen h-full w-full flex items-center justify-center bg-[#1c1c2b] overflow-hidden">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            33% { transform: translateY(-8px); }
            66% { transform: translateY(8px); }
            100% { transform: translateY(0px); }
          }

          @keyframes colorCycle {
            0% { fill: #f18eac; }
            25% { fill: #aae8b2; }
            50% { fill: #95ccfa; }
            75% { fill: #f4c1e6; }
            100% { fill: #f18eac; }
          }

          .animate-float {
            animation: float 2.5s ease-in-out infinite;
          }

          .ghost-1 { 
            animation: float 2.5s ease-in-out infinite,
                      colorCycle 2s linear infinite;
            animation-delay: 0s, 0s;
          }
          .ghost-2 { 
            animation: float 2.5s ease-in-out infinite,
                      colorCycle 2s linear infinite;
            animation-delay: 0.2s, -0.5s;
          }
          .ghost-3 { 
            animation: float 2.5s ease-in-out infinite,
                      colorCycle 2s linear infinite;
            animation-delay: 0.4s, -1s;
          }
          .ghost-4 { 
            animation: float 2.5s ease-in-out infinite,
                      colorCycle 2s linear infinite;
            animation-delay: 0.6s, -1.5s;
          }
        `}
      </style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 163.44 43.6"
        className="w-[80%] max-w-[600px] my-10"
        style={{
          transform: "translateZ(0)",
        }}
      >
        {/* Remove background and pacman paths */}

        {/* Pink Ghost */}
        <path
          className="ghost-1"
          d="M50.08,11.65c0-.36.03-.71,0-1.07-.03-.51.09-.88.71-.79.82.12,1.08-.27.97-1.02-.12-.78.3-.91.98-.9,2.71.03,5.43.03,8.14,0,.72,0,1.03.2.95.94-.06.54-.05,1.09.76.98.77-.11,1.01.26.91.96-.1.7.15,1.06.91.95.68-.1.82.3.76.86-.08.7.08,1.17.94,1.05.59-.08.74.23.74.77-.01,4.56-.02,9.11,0,13.67,0,.65-.26.8-.85.8-.6,0-.92-.17-.83-.81.1-.75-.07-1.24-.99-1.12-.76.1-.7-.46-.68-.93.02-.56,0-.98-.79-.99-.79,0-.97.32-.9.99.07.59-.05,1.04-.81.93-.82-.12-.94.37-.86,1,.07.63-.12.93-.84.93-.73,0-.9-.31-.84-.93.02-.2,0-.4,0-.59,0-2.57-.01-2.56-2.67-2.31-.52.05-.7.23-.69.72.02.79-.02,1.59.01,2.38.03.6-.26.73-.8.73-.54,0-.98-.05-.89-.75.1-.8-.07-1.3-1.06-1.18-.79.09-.63-.56-.61-.99.03-.64-.15-.92-.86-.92-.74,0-.9.32-.83.94.07.65-.07,1.11-.88.99-.77-.11-.86.37-.8.94.08.69-.14.99-.91.98-.8,0-.77-.45-.77-1,0-4.2,0-8.4,0-12.6,0-2.03-.12-1.58,1.64-1.66.55.54.35,1.24.38,1.89.02.64.03,1.28,0,1.91.09,1.55.09,1.57,1.66,1.56,2.94,0,2.65.27,2.67-2.68,0-.91,0-1.81,0-2.72-.01-1.42-.06-1.46-1.45-1.52-.54-.02-1.13.1-1.55-.38Z"
        />

        {/* Rest of the ghost paths with updated classes (remove fill colors) */}
        <path
          className="ghost-2"
          d="M86.98,11.69c1.01-.08,1.96-.14,1.71,1.39-.1.6.47.53.85.51.64-.04.81.25.81.84-.02,4.52-.02,9.03,0,13.55,0,.58-.14.86-.79.87-.67,0-.98-.2-.89-.88.09-.71-.1-1.16-.95-1.05-.72.1-.77-.39-.72-.9.06-.65-.07-1.03-.88-1.02-.77.01-.84.4-.8.98.05.58-.04,1.05-.8.95-.81-.11-.94.36-.87,1,.07.64-.14.92-.85.92-.74,0-.89-.34-.83-.95.02-.2,0-.4,0-.59,0-2.34,0-2.31-2.33-2.3-.76,0-1.1.19-1.03,1,.06.63-.01,1.27.02,1.9.03.61-.1.95-.83.95-.71,0-.92-.29-.85-.92.07-.64-.06-1.11-.87-1-.77.11-.85-.37-.8-.95.05-.57-.02-.99-.8-.97-.68.01-.97.23-.88.9.1.73-.13,1.14-.96,1.03-.73-.09-.75.41-.71.91.06.66-.1,1.02-.89,1.01-.78-.01-.79-.43-.79-.99,0-4.44.02-8.87,0-13.31,0-.7.18-1.05.93-.96.37.04.82,0,.73-.51-.27-1.52.69-1.47,1.71-1.39.4.46.35,1.03.35,1.58.01,1.5,0,3.01,0,4.51,0,.78.31,1.16,1.13,1.16,3.78,0,3.11.28,3.17-2.92.02-.87-.03-1.74.01-2.61.05-.93-.29-1.44-1.28-1.39-.57.01-1.14.03-1.71,0-.59,0-1.18.08-1.68-.34,0-.4.02-.79,0-1.19-.02-.48.14-.78.68-.72.78.1,1.12-.21,1-1-.11-.75.26-.93.96-.93,2.67.03,5.34.04,8.02,0,.81-.01,1.19.19,1.09,1.05-.04.37-.1.92.51.84,1.27-.16,1.21.63,1.16,1.46,0,.16,0,.32,0,.48-.5.41-1.09.34-1.67.33-.57.03-1.14.02-1.71,0-.98-.05-1.33.43-1.3,1.37.05,1.46.03,2.93,0,4.39-.01.8.33,1.15,1.14,1.14,3.68,0,3.12.3,3.17-2.94.01-.99,0-1.98,0-2.97,0-.48,0-.96.35-1.35Z"
        />

        {/* Blue Ghost */}
        <path
          className="ghost-3"
          d="M110.46,11.69c1.01-.08,1.97-.15,1.71,1.38-.1.6.47.54.85.51.64-.04.81.24.81.84-.02,4.52-.02,9.03,0,13.55,0,.58-.13.86-.79.87-.67,0-.98-.2-.89-.88.09-.71-.1-1.16-.95-1.04-.6.08-.76-.26-.73-.79.04-.62.07-1.15-.88-1.14-.9.02-.83.54-.79,1.1.04.6-.17.92-.81.83-.81-.11-.94.36-.87,1,.07.64-.14.92-.85.92-.74,0-.89-.34-.83-.95.02-.2,0-.4,0-.59,0-2.34,0-2.31-2.34-2.3-.76,0-1.1.19-1.03,1,.06.63-.01,1.27.02,1.9.03.61-.1.95-.83.95-.71,0-.92-.29-.85-.92.07-.64-.06-1.11-.87-1-.64.09-.85-.23-.81-.83.04-.56.11-1.08-.79-1.1-.95-.02-.92.52-.88,1.14.04.53-.13.86-.73.79-.71-.09-1.06.18-.96.92.09.66-.09,1.02-.89,1.01-.79-.01-.79-.43-.79-.99,0-4.44.02-8.87,0-13.31,0-.71.18-1.04.94-.96.37.04.82,0,.73-.51-.27-1.53.7-1.46,1.71-1.38.4.47.34,1.03.35,1.58.01,1.5,0,3.01,0,4.51,0,.78.31,1.16,1.13,1.16,3.78,0,3.11.28,3.17-2.92.02-.87-.03-1.74.01-2.61.05-.93-.29-1.44-1.28-1.39-.57.01-1.14.03-1.71,0-.58,0-1.18.08-1.69-.33,0-.4.02-.79,0-1.19-.02-.48.14-.79.67-.72.91.13,1.1-.36,1.01-1.11-.08-.64.24-.81.84-.81,2.79.02,5.59.02,8.38,0,.6,0,.92.17.84.81-.1.76.09,1.24,1.01,1.11.53-.07.7.24.67.72-.02.4,0,.79,0,1.19-.5.41-1.09.33-1.67.33-.57.03-1.14.02-1.71,0-.98-.05-1.33.43-1.3,1.37.05,1.46.03,2.93,0,4.39-.01.8.33,1.15,1.14,1.14,3.68,0,3.12.3,3.17-2.94.01-.99,0-1.98,0-2.97,0-.48,0-.96.35-1.35Z"
        />

        {/* Purple Ghost */}
        <path
          className="ghost-4"
          d="M133.93,11.69c1.03-.1,1.97-.13,1.72,1.39-.08.5.39.54.75.5.8-.08.91.35.9,1.01-.02,4.4-.01,8.8,0,13.2,0,.52.08,1.03-.74,1.05-.75.02-1-.26-.95-.97.02-.36.15-.95-.45-.91-1.02.06-1.34-.35-1.23-1.31.08-.65-.43-.63-.88-.64-.45,0-.84.09-.77.63.12.95-.2,1.37-1.23,1.31-.59-.04-.47.55-.45.91.05.71-.2.99-.95.97-.82-.02-.75-.52-.74-1.04,0-.16,0-.32,0-.48-.07-2.66.51-2.24-2.33-2.32-.78-.02-1.1.22-1.03,1.01.05.59,0,1.19.01,1.78,0,.52.08,1.03-.74,1.04-.75.02-1-.26-.95-.97.02-.36.15-.95-.45-.91-1.03.06-1.34-.36-1.23-1.31.08-.66-.43-.63-.89-.63-.45,0-.84.09-.77.64.12.96-.21,1.37-1.23,1.31-.59-.04-.47.55-.45.91.05.71-.2.99-.95.97-.82-.02-.74-.52-.74-1.05,0-4.4,0-8.8,0-13.2,0-.66.11-1.09.9-1,.36.04.84,0,.75-.5-.25-1.52.69-1.49,1.72-1.39.4.47.34,1.04.34,1.58.02,1.5.01,3.01,0,4.51,0,.78.32,1.16,1.13,1.16,3.77,0,3.11.28,3.17-2.92.02-.87-.03-1.74.01-2.61.05-.93-.29-1.44-1.28-1.39-.57.01-1.14.03-1.71,0-.58,0-1.18.08-1.68-.33,0-.39,0-.79,0-1.18-.02-.47.15-.79.67-.72.91.12,1.09-.38,1.01-1.12-.07-.65.27-.8.86-.8,2.78.02,5.56.02,8.34,0,.58,0,.93.15.86.8-.09.75.09,1.24,1.01,1.12.53-.07.69.25.67.72-.02.39,0,.79,0,1.18-.5.41-1.09.32-1.67.33-.57.03-1.14.02-1.7,0-.98-.05-1.33.43-1.3,1.37.05,1.46.03,2.93,0,4.39-.01.8.33,1.15,1.14,1.15,3.69,0,3.12.3,3.17-2.93.01-.99,0-1.98,0-2.97,0-.47,0-.96.34-1.35Z"
        />
      </svg>
    </div>
  );
};

// Add display name for better debugging
LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;
