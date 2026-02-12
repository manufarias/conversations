import { useRef, useState, useEffect } from "react";
import { AuthLayout } from "./AuthLayout";

interface OTPVerificationViewProps {
  email: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OTPVerificationView({
  email,
  onVerify,
  onBack,
}: OTPVerificationViewProps) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect back if no email
  useEffect(() => {
    if (!email) {
      onBack();
      return;
    }
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, [email, onBack]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto advance
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter" && otp.every((d) => d !== "")) {
      handleContinue();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4).split("");
    if (pastedData.every((char) => /^\d$/.test(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, index) => {
        if (index < 4) newOtp[index] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pastedData.length, 3);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleContinue = () => {
    if (otp.every((d) => d !== "")) {
      console.log("OTP verification:", { email, code: otp.join("") });
      onVerify();
    }
  };

  const handleResend = () => {
    console.log("Resending OTP to:", email);
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[384px] flex flex-col items-center gap-[24px]">
        {/* Header */}
        <div className="w-full flex flex-col gap-[8px] items-start">
          <p className="text-[#40435b] text-[18px] font-bold leading-[22px]">
            Verificación de identidad
          </p>
          <p className="text-[#40435b] text-[26px] font-bold leading-[30px]">
            Verificá tu correo
          </p>
          <p className="text-[#6b6f93] text-[15.72px] leading-[1.5] w-full">
            Ingresá el código que te enviamos a <br />
            <span className="font-bold">{email || "usuario@correo.com"}</span>
          </p>
        </div>

        {/* OTP Form */}
        <div className="w-full flex flex-col items-start gap-[15.74px]">
          <div className="w-full flex flex-col gap-[4px]">
            <label className="text-[#40435b] text-[15.74px] font-semibold leading-[20px]">
              Código
            </label>

            <div className="flex gap-[15px] items-center">
              {otp.map((digit, index) => (
                <div key={index} className="relative w-[35px] h-[39px]">
                  <input
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-full h-full rounded-[8px] border border-[#6b6f93] text-center text-[16px] text-[#40435b] focus:outline-none focus:border-[#1A66FC] focus:ring-1 focus:ring-[#1A66FC] transition-all"
                    placeholder="-"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            <span className="text-[#40435b] text-[13.77px] leading-[18px]">
              ¿No recibiste el código?
            </span>
            <button
              type="button"
              onClick={handleResend}
              className="text-[#6b6f93] text-[15.74px] font-semibold border-b border-[#6b6f93] hover:text-[#40435b] hover:border-[#40435b] transition-colors leading-[22px]"
            >
              Reenviar código
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-[32px] items-start mt-[8px]">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 h-[42px] flex items-center justify-center rounded-[8px] hover:bg-gray-50 transition-colors"
          >
            <span className="text-[#40435b] text-[18px] font-bold">Volver</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="flex-1 h-[42px] bg-[#1a66fc] text-white flex items-center justify-center rounded-[8px] hover:bg-[#1553ce] transition-colors"
          >
            <span className="text-[18px] font-bold">Continuar</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
