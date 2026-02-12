import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { X, Search, Calendar as CalendarIcon, Clock } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface AppointmentWizardProps {
  patientName: string;
  primaryCarePhysician?: string; // e.g., "Dra. Isabel Vargas, MD"
  onClose: () => void;
  onConfirm: (appointment: {
    type: string;
    doctor: string;
    date: Date;
    time: string;
  }) => void;
}

// Mock doctor data
const mockDoctors = [
  { id: "1", name: "Dra. Patricia Romero", specialty: "Medicina General" },
  { id: "2", name: "Dr. Luis Mendoza", specialty: "Medicina General" },
  { id: "3", name: "Dra. Isabel Vargas", specialty: "Medicina General" },
  { id: "4", name: "Dr. Rafael Sánchez", specialty: "Cardiología" },
  { id: "5", name: "Dr. Fernando Morales", specialty: "Cardiología" },
  { id: "6", name: "Dr. Miguel Torres", specialty: "Medicina General" },
  { id: "7", name: "Dra. Carmen Silva", specialty: "Dermatología" },
  { id: "8", name: "Dr. Alberto Reyes", specialty: "Neurología" },
  { id: "9", name: "Dra. Gabriela Fernández", specialty: "Pediatría" },
  { id: "10", name: "Dr. Ricardo Navarro", specialty: "Oftalmología" },
];

// Mock time slots
const mockTimeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export function AppointmentWizard({ patientName, primaryCarePhysician, onClose, onConfirm }: AppointmentWizardProps) {
  const [step, setStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  // Extract PCP name (without ", MD" suffix)
  const pcpName = primaryCarePhysician ? primaryCarePhysician.replace(/, MD$/, "") : null;

  // Sort doctors: PCP first, then alphabetically
  const sortedDoctors = useMemo(() => {
    const sorted = [...mockDoctors].sort((a, b) => {
      // If a is the PCP, it comes first
      if (pcpName && a.name === pcpName) return -1;
      // If b is the PCP, it comes first
      if (pcpName && b.name === pcpName) return 1;
      // Otherwise sort alphabetically
      return a.name.localeCompare(b.name);
    });
    return sorted;
  }, [pcpName]);

  const filteredDoctors = sortedDoctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedDoctor && appointmentType && selectedTime) {
      onConfirm({
        type: appointmentType,
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
      });
    }
  };

  const canProceedStep1 = appointmentType !== "";
  const canProceedStep2 = selectedDoctor !== "";
  const canConfirm = selectedDate && selectedTime !== "";

  return (
    <div className="h-full flex flex-col bg-white border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            Agendar Cita - Paso {step} de 3
          </h3>
          <p className="text-sm text-muted-foreground">Paciente: {patientName}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                num <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 px-4">
        <div className="py-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-medium mb-2">¿Qué tipo de cita?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecciona el tipo de consulta que el paciente necesita.
                </p>
              </div>

              <RadioGroup value={appointmentType} onValueChange={setAppointmentType}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general" className="flex-1 cursor-pointer">
                      <div className="font-medium">Consulta General</div>
                      <div className="text-sm text-muted-foreground">
                        Chequeo de rutina, síntomas generales
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="specialist" id="specialist" />
                    <Label htmlFor="specialist" className="flex-1 cursor-pointer">
                      <div className="font-medium">Especialista</div>
                      <div className="text-sm text-muted-foreground">
                        Cardiología, dermatología, etc.
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="lab" id="lab" />
                    <Label htmlFor="lab" className="flex-1 cursor-pointer">
                      <div className="font-medium">Estudio/Laboratorio</div>
                      <div className="text-sm text-muted-foreground">
                        Análisis de sangre, rayos X, etc.
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-medium mb-2">¿Con qué doctor?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Busca y selecciona el médico para la cita.
                </p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre o especialidad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredDoctors.map((doctor) => {
                  const isPCP = pcpName && doctor.name === pcpName;
                  return (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.name)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedDoctor === doctor.name
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{doctor.name}</div>
                        {isPCP && (
                          <Badge variant="secondary" className="text-xs">
                            Médico de Cabecera
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{doctor.specialty}</div>
                    </div>
                  );
                })}
                {filteredDoctors.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No se encontraron doctores
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium mb-2">Seleccionar Fecha y Hora</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Elige la fecha y hora disponible para la cita.
                </p>
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Fecha
                </Label>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>
              </div>

              {selectedDate && (
                <div>
                  <Label className="mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Hora Disponible
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {mockTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          Atrás
        </Button>

        {step < 3 ? (
          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && !canProceedStep1) ||
              (step === 2 && !canProceedStep2)
            }
          >
            Siguiente
          </Button>
        ) : (
          <Button
            onClick={handleConfirm}
            disabled={!canConfirm}
          >
            Confirmar Cita
          </Button>
        )}
      </div>
    </div>
  );
}
