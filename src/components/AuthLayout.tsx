import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex w-full h-screen bg-white font-['Lato',sans-serif]">
      {/* Left Column - Visual */}
      <div className="hidden lg:block w-[720px] h-full shrink-0 relative overflow-hidden">
        <img
          src="/Img.png"
          alt="Doctor con paciente"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Column - Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        {children}
      </div>
    </div>
  );
}

// Clases necesarias para Tailwind CSS v4:
// lg:block lg:w-1/2
