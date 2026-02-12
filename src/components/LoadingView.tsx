import { useEffect, useState } from "react";
import { OsanaLogo } from "./OsanaLogo";

interface LoadingViewProps {
  onComplete: () => void;
}

export function LoadingView({ onComplete }: LoadingViewProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 60 ? 8 : prev < 85 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white font-['Lato',sans-serif]">
      <div className="flex flex-col items-center gap-[32px]">
        {/* Logo with pulse */}
        <div
          className="transition-transform duration-700"
          style={{
            animation: "gentle-pulse 2s ease-in-out infinite",
          }}
        >
          <OsanaLogo className="w-[136px] h-[136px]" />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-[12px]">
          <p className="text-[#40435b] text-[18px] font-bold leading-[22px]">
            Preparando tu espacio de trabajo
          </p>
          <p className="text-[#6b6f93] text-[14px] leading-[18px]">
            Cargando conversaciones...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-[280px] h-[4px] bg-[#e0e1e9] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1A66FC] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style>{`
        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
