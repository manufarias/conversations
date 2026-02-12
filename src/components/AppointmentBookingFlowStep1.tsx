import { Search } from "lucide-react";
import svgPaths2 from "../imports/svg-2c8vuvkdai";

interface Step1Props {
  appointmentData: {
    patient: string;
    coverage: string;
    specialty: string;
  };
  showSuggestions: boolean;
  filteredSuggestions: string[];
  onSpecialtyChange: (specialty: string) => void;
  onShowSuggestionsChange: (show: boolean) => void;
  onSelectSuggestion: (specialty: string) => void;
}

export function AppointmentBookingFlowStep1({
  appointmentData,
  showSuggestions,
  filteredSuggestions,
  onSpecialtyChange,
  onShowSuggestionsChange,
  onSelectSuggestion,
}: Step1Props) {
  return (
    <div className="p-4 space-y-6">
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-['Lato'] text-[16px] text-[#40435b]">
            Información del turno
          </p>
          <p className="font-['Lato'] text-[12px] text-[#6b6f93]">
            1/2
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-1 bg-[#1a66fc] rounded-full" />
          <div className="flex-1 h-1 bg-[#e0e1e9] rounded-full" />
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm p-3 space-y-6">
        {/* Patient Selection */}
        <div className="space-y-1.5">
          <label className="font-['Lato'] text-[16px] text-[#40435b] block">
            ¿Para quién es el turno?
          </label>
          <div className="bg-white border border-[#acaec4] rounded-lg px-4 py-2.5 flex items-center gap-3">
            <div className="flex-1">
              <p className="font-['Lato'] text-[16px] text-[#40435b]">
                {appointmentData.patient}
              </p>
            </div>
            <button className="flex items-center gap-2 text-[#1a66fc]">
              <span className="font-['Lato'] text-[12px]">Cambiar</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 14 14">
                <path d={svgPaths2.p25cae480} fill="#1A66FC" />
              </svg>
            </button>
          </div>
        </div>

        {/* Coverage Selection */}
        <div className="space-y-1.5">
          <label className="font-['Lato'] text-[16px] text-[#40435b] block">
            ¿Qué cobertura tenés?
          </label>
          <div className="bg-white border border-[#acaec4] rounded-lg px-4 py-2.5 flex items-center gap-3">
            <div className="flex-1">
              <p className="font-['Lato'] text-[16px] text-[#40435b]">
                {appointmentData.coverage}
              </p>
            </div>
            <button className="flex items-center gap-2 text-[#1a66fc]">
              <span className="font-['Lato'] text-[12px]">Cambiar</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 14 14">
                <path d={svgPaths2.p25cae480} fill="#1A66FC" />
              </svg>
            </button>
          </div>
        </div>

        {/* Specialty Search */}
        <div className="space-y-1 relative">
          <label className="font-['Lato'] text-[16px] text-[#40435b] block">
            ¿Qué turnos necesitás?
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-[#acaec4]" />
            <input
              type="text"
              placeholder="Especialidad o profesional"
              value={appointmentData.specialty}
              onChange={(e) => {
                onSpecialtyChange(e.target.value);
                onShowSuggestionsChange(true);
              }}
              onFocus={() => onShowSuggestionsChange(true)}
              onBlur={() => setTimeout(() => onShowSuggestionsChange(false), 200)}
              className="w-full bg-white border border-[#acaec4] rounded-lg pl-14 pr-4 py-2.5 font-['Lato'] text-[16px] text-[#40435b] placeholder:text-[#acaec4] focus:outline-none focus:ring-2 focus:ring-[#1a66fc] focus:border-transparent"
            />
            
            {/* Autocomplete Suggestions */}
            {showSuggestions && appointmentData.specialty && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#acaec4] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredSuggestions.map((specialty, index) => (
                  <button
                    key={index}
                    onClick={() => onSelectSuggestion(specialty)}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#f8f8f8] font-['Lato'] text-[16px] text-[#40435b] border-b border-[#e0e1e9] last:border-b-0"
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
