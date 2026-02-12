import { ChevronDown, Calendar, MapPin, DollarSign, User } from "lucide-react";
import svgPaths3 from "../imports/svg-pb2vbaz0eg";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  location: string;
  copay: string;
  availableDates: { date: string; times: string[] }[];
}

interface Step2Props {
  appointmentData: {
    type?: "presencial" | "virtual";
    specialty: string;
  };
  filteredProfessionals: Professional[];
  selectedDate: string;
  selectedProfessional: string | null;
  selectedTime: string | null;
  onTypeChange: (type: "presencial" | "virtual") => void;
  onDateChange: (date: string) => void;
  onProfessionalSelect: (id: string, time: string) => void;
}

export function AppointmentBookingFlowStep2({
  appointmentData,
  filteredProfessionals,
  selectedDate,
  selectedProfessional,
  selectedTime,
  onTypeChange,
  onDateChange,
  onProfessionalSelect,
}: Step2Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Tabs & Date Selection */}
      <div className="bg-white px-4 pt-4 pb-0 space-y-4 shadow-sm">
        {/* Tabs */}
        <div className="flex rounded-lg overflow-hidden">
          <button
            onClick={() => onTypeChange("presencial")}
            className={`flex-1 py-4 font-['Lato'] text-[16px] transition-all ${
              appointmentData.type === "presencial"
                ? "text-[#1a66fc] border-b-[4px] border-[#1a66fc]"
                : "text-[#6b6f93] border-b-2 border-[#e0e1e9]"
            }`}
          >
            Consulta presencial
          </button>
          <button
            onClick={() => onTypeChange("virtual")}
            className={`flex-1 py-4 font-['Lato'] text-[16px] transition-all ${
              appointmentData.type === "virtual"
                ? "text-[#1a66fc] border-b-[4px] border-[#1a66fc]"
                : "text-[#6b6f93] border-b-2 border-[#e0e1e9]"
            }`}
          >
            Consulta virtual
          </button>
        </div>

        {/* Date Selection */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            {["Lun 15/05", "Jue 17/05", "Lun 22/05", "Vie 04/06", "Sab 25/06", "Dom 26/06"].map((date) => (
              <button
                key={date}
                onClick={() => onDateChange(date)}
                className={`px-3 py-2 rounded-lg font-['Lato'] text-[14px] whitespace-nowrap transition-all ${
                  selectedDate === date
                    ? "bg-[#023bac] text-white"
                    : "bg-[#e8f0ff] text-[#1a66fc]"
                }`}
              >
                <div className="leading-[18px]">{date.split(" ")[0]}</div>
                <div className="leading-[18px]">{date.split(" ")[1]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Button */}
        <button className="flex items-center gap-2 text-[#1a66fc] font-['Lato'] text-[14px] pb-4">
          <Calendar className="h-4 w-4" />
          <span>Buscar fecha en calendario</span>
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="flex items-center gap-2 px-2 py-1 bg-white border border-[#1a66fc] rounded-lg whitespace-nowrap">
            <ChevronDown className="h-4 w-4 text-[#1a66fc]" />
            <span className="font-['Lato'] text-[12px] text-[#1a66fc]">Sede</span>
          </button>
          <button className="flex items-center gap-2 px-2 py-1 bg-white border border-[#1a66fc] rounded-lg whitespace-nowrap">
            <ChevronDown className="h-4 w-4 text-[#1a66fc]" />
            <span className="font-['Lato'] text-[12px] text-[#1a66fc]">Profesional</span>
          </button>
          <button className="flex items-center gap-2 px-2 py-1 bg-white border border-[#1a66fc] rounded-lg whitespace-nowrap">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths3.p2a7912c0} fill="#1A66FC" />
            </svg>
            <span className="font-['Lato'] text-[12px] text-[#1a66fc]">Otros filtros</span>
          </button>
        </div>

        {/* Results Header */}
        <div>
          <p className="font-['Lato'] text-[14px] text-[#40435b]">
            Resultados de búsqueda
          </p>
          <p className="font-['Lato'] text-[14px] text-[#6b6f93]">
            {filteredProfessionals.length} profesionales disponibles
          </p>
        </div>

        {/* Professional Cards */}
        {filteredProfessionals.length > 0 ? filteredProfessionals.map((professional) => {
          const dateSlots = professional.availableDates.find(d => d.date === selectedDate);
          if (!dateSlots) return null;

          return (
            <div key={professional.id} className="bg-white rounded-lg shadow-sm p-4 space-y-3">
              {/* Professional Info */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e8f0ff] flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-[#1a66fc]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Lato'] text-[14px] text-[#40435b]">
                    {professional.name}
                  </p>
                  <p className="font-['Lato'] text-[14px] text-[#6b6f93]">
                    {professional.specialty}
                  </p>
                </div>
              </div>

              {/* Copay */}
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#E22E2E]" />
                <p className="font-['Lato'] text-[14px] text-[#40435b]">
                  Copago cobertura <span className="font-['Lato']">{professional.copay}</span>
                </p>
              </div>

              <div className="border-t border-[#e0e1e9]" />

              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#40435b]" />
                <p className="font-['Lato'] text-[14px] text-[#40435b]">
                  {professional.location}
                </p>
              </div>

              {/* Time Slots */}
              <div className="flex gap-2 flex-wrap">
                {dateSlots.times.slice(0, 3).map((time) => (
                  <button
                    key={time}
                    onClick={() => onProfessionalSelect(professional.id, time)}
                    className={`flex-1 min-w-[70px] px-3 py-2 rounded-lg font-['Lato'] text-[14px] transition-all ${
                      selectedProfessional === professional.id && selectedTime === time
                        ? "bg-[#f1f6ff] border-[2.5px] border-[#1a66fc] text-[#1a66fc]"
                        : "bg-white border border-[#1a66fc] text-[#1a66fc]"
                    }`}
                  >
                    {time}
                  </button>
                ))}
                {dateSlots.times.length > 3 && (
                  <button className="px-3 py-2 font-['Lato'] text-[14px] text-[#1a66fc]">
                    Ver más
                  </button>
                )}
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-12">
            <p className="font-['Lato'] text-[16px] text-[#6b6f93] mb-2">
              No se encontraron profesionales para "{appointmentData.specialty}"
            </p>
            <p className="font-['Lato'] text-[14px] text-[#acaec4]">
              Intenta con otra especialidad o nombre de profesional
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
