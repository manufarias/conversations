import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X } from "lucide-react";
import { AppointmentBookingFlowStep1 } from "./AppointmentBookingFlowStep1";
import { AppointmentBookingFlowStep2 } from "./AppointmentBookingFlowStep2";

interface AppointmentBookingFlowProps {
  patientName?: string;
  onClose: () => void;
  onComplete?: (appointmentDetails: AppointmentDetails) => void;
  isPanel?: boolean;
}

interface AppointmentDetails {
  patient: string;
  coverage: string;
  specialty: string;
  professional?: string;
  date?: string;
  time?: string;
  location?: string;
  type?: "presencial" | "virtual";
}

const mockProfessionals = [
  {
    id: "1",
    name: "Diego Landa",
    specialty: "Clínica médica",
    location: "Sanatorio Osana Salud",
    copay: "$2.000",
    availableDates: [
      { date: "Lun 15/05", times: ["08:00", "09:20", "10:00", "11:30"] },
      { date: "Jue 17/05", times: ["08:00", "14:00", "15:30"] },
      { date: "Lun 22/05", times: ["09:00", "10:20", "16:00"] },
    ],
  },
  {
    id: "2",
    name: "María Fernández",
    specialty: "Clínica médica",
    location: "Centro Médico Central",
    copay: "$1.500",
    availableDates: [
      { date: "Lun 15/05", times: ["09:00", "10:30", "14:00"] },
      { date: "Mar 16/05", times: ["08:30", "11:00", "15:00"] },
    ],
  },
  {
    id: "3",
    name: "Carlos Ramírez",
    specialty: "Cardiología",
    location: "Hospital San Juan",
    copay: "$3.500",
    availableDates: [
      { date: "Lun 15/05", times: ["10:00", "11:00", "15:00"] },
      { date: "Jue 17/05", times: ["09:00", "14:30"] },
      { date: "Lun 22/05", times: ["08:00", "16:30"] },
    ],
  },
  {
    id: "4",
    name: "Ana Martínez",
    specialty: "Dermatología",
    location: "Clínica Derma Care",
    copay: "$2.800",
    availableDates: [
      { date: "Lun 15/05", times: ["08:30", "10:00", "14:00"] },
      { date: "Jue 17/05", times: ["09:30", "11:00", "16:00"] },
    ],
  },
  {
    id: "5",
    name: "Roberto Silva",
    specialty: "Traumatología",
    location: "Centro Traumatológico",
    copay: "$3.200",
    availableDates: [
      { date: "Lun 15/05", times: ["09:00", "11:30"] },
      { date: "Lun 22/05", times: ["08:00", "10:00", "15:00"] },
      { date: "Vie 04/06", times: ["09:00", "14:00"] },
    ],
  },
  {
    id: "6",
    name: "Patricia González",
    specialty: "Pediatría",
    location: "Hospital Infantil",
    copay: "$2.200",
    availableDates: [
      { date: "Lun 15/05", times: ["08:00", "09:00", "10:00", "14:00"] },
      { date: "Jue 17/05", times: ["08:30", "10:30", "15:30"] },
    ],
  },
  {
    id: "7",
    name: "Fernando López",
    specialty: "Oftalmología",
    location: "Centro de Visión",
    copay: "$2.600",
    availableDates: [
      { date: "Jue 17/05", times: ["10:00", "11:30", "16:00"] },
      { date: "Lun 22/05", times: ["09:00", "14:30"] },
    ],
  },
  {
    id: "8",
    name: "Lucía Romero",
    specialty: "Ginecología",
    location: "Clínica de la Mujer",
    copay: "$3.000",
    availableDates: [
      { date: "Lun 15/05", times: ["09:30", "11:00", "15:30"] },
      { date: "Vie 04/06", times: ["08:00", "10:00", "14:00"] },
    ],
  },
  {
    id: "9",
    name: "Martín Díaz",
    specialty: "Neurología",
    location: "Instituto Neurológico",
    copay: "$3.800",
    availableDates: [
      { date: "Jue 17/05", times: ["08:00", "10:00"] },
      { date: "Lun 22/05", times: ["09:00", "11:00", "16:00"] },
    ],
  },
  {
    id: "10",
    name: "Valentina Cruz",
    specialty: "Nutrición",
    location: "Centro de Nutrición",
    copay: "$1.800",
    availableDates: [
      { date: "Lun 15/05", times: ["08:00", "09:00", "10:00", "11:00", "14:00"] },
      { date: "Jue 17/05", times: ["09:00", "11:00", "15:00"] },
      { date: "Lun 22/05", times: ["08:30", "10:30", "14:30"] },
    ],
  },
];

export function AppointmentBookingFlow({ patientName = "Ricardo Rivero", onClose, onComplete, isPanel = false }: AppointmentBookingFlowProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [appointmentData, setAppointmentData] = useState<AppointmentDetails>({
    patient: patientName,
    coverage: "Plan Austral",
    specialty: "",
    type: "presencial",
  });
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("Lun 15/05");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get unique specialties for autocomplete
  const allSpecialties = Array.from(new Set(mockProfessionals.map(p => p.specialty))).sort();
  
  // Filter specialties based on current input
  const filteredSuggestions = allSpecialties.filter(specialty =>
    specialty.toLowerCase().includes(appointmentData.specialty.toLowerCase())
  );

  // Filter professionals based on selected specialty
  const filteredProfessionals = mockProfessionals.filter(professional => {
    if (!appointmentData.specialty) return true;
    const searchLower = appointmentData.specialty.toLowerCase();
    return professional.specialty.toLowerCase().includes(searchLower) ||
           professional.name.toLowerCase().includes(searchLower);
  });

  const handleContinueStep1 = () => {
    if (appointmentData.specialty) {
      setStep(2);
    }
  };

  const handleSelectAppointment = () => {
    if (selectedTime && selectedProfessional) {
      const professional = mockProfessionals.find(p => p.id === selectedProfessional);
      if (onComplete) {
        onComplete({
          ...appointmentData,
          professional: professional?.name,
          date: selectedDate,
          time: selectedTime,
          location: professional?.location,
        });
      }
      onClose();
    }
  };

  const handleProfessionalSelect = (id: string, time: string) => {
    setSelectedProfessional(id);
    setSelectedTime(time);
  };

  // Shared step content
  const stepContent = (
    <AnimatePresence mode="wait">
      {step === 1 ? (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <AppointmentBookingFlowStep1
            appointmentData={appointmentData}
            showSuggestions={showSuggestions}
            filteredSuggestions={filteredSuggestions}
            onSpecialtyChange={(specialty) => setAppointmentData({ ...appointmentData, specialty })}
            onShowSuggestionsChange={setShowSuggestions}
            onSelectSuggestion={(specialty) => {
              setAppointmentData({ ...appointmentData, specialty });
              setShowSuggestions(false);
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <AppointmentBookingFlowStep2
            appointmentData={appointmentData}
            filteredProfessionals={filteredProfessionals}
            selectedDate={selectedDate}
            selectedProfessional={selectedProfessional}
            selectedTime={selectedTime}
            onTypeChange={(type) => setAppointmentData({ ...appointmentData, type })}
            onDateChange={setSelectedDate}
            onProfessionalSelect={handleProfessionalSelect}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Panel mode: render without backdrop and full height
  if (isPanel) {
    return (
      <div className="h-full flex flex-col bg-[#f8f8f8] overflow-hidden">
        {/* Header */}
        <div className="bg-white px-4 py-5 flex items-center gap-4 shadow-sm flex-shrink-0">
          <button onClick={onClose} className="p-0 hover:opacity-70 transition-opacity">
            <X className="h-6 w-6" style={{ stroke: "#1A66FC", strokeWidth: 2 }} />
          </button>
          <h1 className="font-['Lato'] text-[18px] text-[#40435b] flex-1">
            Agendar turno
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {stepContent}
        </div>

        {/* Footer Button */}
        <div className="bg-white px-4 py-6 shadow-[0px_-4px_15px_-3px_rgba(64,67,91,0.1)] flex-shrink-0">
          <button
            onClick={step === 1 ? handleContinueStep1 : handleSelectAppointment}
            disabled={step === 1 ? !appointmentData.specialty : !selectedTime}
            className="w-full bg-[#1a66fc] text-white font-['Lato'] text-[16px] py-2.5 rounded-lg transition-all hover:bg-[#0347CE] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 1 ? "Continuar" : "Seleccionar turno"}
          </button>
        </div>
      </div>
    );
  }

  // Modal mode: original implementation
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center sm:justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="bg-[#f8f8f8] w-full max-w-[440px] h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white px-4 py-5 flex items-center gap-4 shadow-sm">
          <button onClick={onClose} className="p-0 hover:opacity-70 transition-opacity">
            <ArrowLeft className="h-6 w-6" style={{ stroke: "#1A66FC", strokeWidth: 2 }} />
          </button>
          <h1 className="font-['Lato'] text-[18px] text-[#40435b] flex-1">
            Agendar turno
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {stepContent}
        </div>

        {/* Footer Button */}
        <div className="bg-white px-4 py-6 shadow-[0px_-4px_15px_-3px_rgba(64,67,91,0.1)]">
          <button
            onClick={step === 1 ? handleContinueStep1 : handleSelectAppointment}
            disabled={step === 1 ? !appointmentData.specialty : !selectedTime}
            className="w-full bg-[#1a66fc] text-white font-['Lato'] text-[16px] py-2.5 rounded-lg transition-all hover:bg-[#0347CE] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 1 ? "Continuar" : "Seleccionar turno"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
