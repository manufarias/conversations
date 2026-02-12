import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { OsanaLogo } from "./OsanaLogo";

// Eye-off SVG path from Figma
const eyeOffPath =
  "M6.7151 6.89903C8.10116 5.82091 9.87832 4.99998 12.0122 4.99998C14.5402 4.99998 16.5646 6.15122 18.0382 7.51871C19.5025 8.87494 20.4818 10.4718 20.9449 11.6155C21.0481 11.8624 21.0481 12.1374 20.9449 12.3843C20.5256 13.3936 19.684 14.8155 18.445 16.0842L21.7365 18.6592C22.0619 18.9155 22.1213 19.3873 21.8648 19.7123C21.6082 20.0373 21.1357 20.0967 20.8103 19.8405L2.28772 5.34029C1.96132 5.08467 1.9041 4.61343 2.15994 4.28737C2.41581 3.96137 2.88764 3.90421 3.21428 4.15974L6.7151 6.89903ZM7.93846 7.85933L9.37771 8.98432C10.0817 8.37182 11.0047 7.99995 12.0122 7.99995C14.2242 7.99995 16.017 9.79056 16.017 11.9999C16.017 12.6624 15.8575 13.2843 15.5727 13.8343L17.256 15.153C18.3042 14.0874 19.0801 12.8468 19.4775 11.9999C19.0238 11.0343 18.2197 9.73431 17.0151 8.61557C15.7292 7.42496 14.0521 6.47184 12.0122 6.47184C10.4321 6.47184 9.04293 7.05402 7.93846 7.85933ZM14.3556 12.8812C14.4589 12.6062 14.5152 12.3093 14.5152 11.9718C14.5152 10.6187 13.3951 9.47181 12.0122 9.47181C11.9903 9.47181 11.9715 9.49994 11.9214 9.49994C11.9903 9.65931 12.0122 9.82806 12.0122 9.97181C12.0122 10.3187 11.9371 10.6187 11.8057 10.8843L14.3556 12.8812ZM14.6497 16.953L15.9607 17.9842C14.825 18.5967 13.5077 18.9998 12.0122 18.9998C9.48409 18.9998 7.45975 17.8498 5.98609 16.4811C4.52243 15.0968 3.54374 13.4999 3.07818 12.3843C2.97555 12.1374 2.97555 11.8624 3.07818 11.6155C3.37667 10.8999 3.88635 9.97493 4.59972 9.04682L5.77959 9.97493C5.1945 10.703 4.80841 11.4249 4.5484 11.9718C4.97298 12.9374 5.80462 14.2655 7.00921 15.3842C8.29514 16.5749 9.97218 17.4999 12.0122 17.4999C12.9727 17.4999 13.8519 17.2936 14.6497 16.953ZM8.00729 11.9718C8.00729 11.9093 8.01042 11.8218 8.01668 11.7343L9.77194 13.1155C10.1005 13.7749 10.7137 14.2686 11.449 14.4093L13.2074 15.8186C12.8288 15.9092 12.4283 15.9999 11.984 15.9999C9.8001 15.9999 7.97913 14.2093 7.97913 11.9718H8.00729Z";

interface LoginViewProps {
  onLogin: (email: string) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      console.log("Login attempt:", { email });
      onLogin(email);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[384px] flex flex-col items-center gap-[56px]">
        {/* Logo */}
        <OsanaLogo className="w-[136px] h-[136px] shrink-0" />

        {/* Form section */}
        <div className="w-full flex flex-col gap-[32px] items-center">
          <h1 className="text-[#40435b] text-[24px] font-bold text-center leading-[28px]">
            Iniciar sesión
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-[32px]"
          >
            <div className="flex flex-col gap-[32px]">
              {/* Email */}
              <div className="flex flex-col gap-[4px] w-full">
                <label className="text-[#40435b] text-[16px] font-semibold leading-[20px]">
                  Correo electrónico *
                </label>
                <div className="relative w-full h-[40px]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@correo.com"
                    required
                    className="w-full h-full rounded-[8px] border border-[#acaec4] px-[16px] py-[10px] text-[16px] text-[#40435b] placeholder:text-[#acaec4] focus:outline-none focus:border-[#1A66FC] focus:ring-1 focus:ring-[#1A66FC] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[16px] w-full">
                <div className="flex flex-col gap-[4px] w-full">
                  <label className="text-[#40435b] text-[16px] font-semibold leading-[20px]">
                    Contraseña *
                  </label>
                  <div className="relative w-full h-[40px]">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="**********"
                      required
                      className="w-full h-full rounded-[8px] border border-[#acaec4] px-[16px] py-[10px] text-[16px] text-[#40435b] placeholder:text-[#6b6f93] focus:outline-none focus:border-[#1A66FC] focus:ring-1 focus:ring-[#1A66FC] pr-[40px] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] flex items-center justify-center text-[#ACAEC4] hover:text-[#40435b] transition-colors"
                    >
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d={eyeOffPath} fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="flex justify-start w-full">
                  <a
                    href="#"
                    className="text-[#1a66fc] text-[14px] font-bold border-b border-[#1a66fc] hover:opacity-80 leading-[18px]"
                    onClick={(e) => e.preventDefault()}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#1A66FC] text-white font-bold text-[16px] h-[48px] rounded-[8px] hover:bg-[#1553ce] transition-colors"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
