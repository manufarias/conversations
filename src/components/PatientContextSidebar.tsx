import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { 
  Edit, 
  ChevronRight, 
  Briefcase, 
  Calendar, 
  Building2, 
  Users 
} from "lucide-react";

export interface ActiveRequest {
  id: string;
  type: string;
  details: string;
  submittedDate: string;
  status: string;
  statusColor: "amber" | "sky" | "emerald" | "gray";
}

export interface Segment {
  id: string;
  name: string;
  description: string;
}

export interface RecentActivity {
  appointments: {
    upcoming?: {
      date: string;
      provider: string;
    };
    past?: {
      date: string;
      provider: string;
    };
  };
}

export interface HealthcareContext {
  pcp: string;
  familyAccess: Array<{
    name: string;
    relation: string;
  }>;
}

export interface PatientContextData {
  name: string;
  dob: string;
  mrn: string;
  activeRequests: ActiveRequest[];
  segments: Segment[];
  recentActivity: RecentActivity;
  context: HealthcareContext;
}

interface PatientContextSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  patientData: PatientContextData | null;
}

export function PatientContextSidebar({ isOpen, onClose, patientData }: PatientContextSidebarProps) {
  if (!patientData) return null;

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColorClass = (color: string) => {
    switch (color) {
      case "amber":
        return "text-amber-600";
      case "sky":
        return "text-sky-600";
      case "emerald":
        return "text-emerald-600";
      default:
        return "text-muted-foreground";
    }
  };

  const age = calculateAge(patientData.dob);
  const dobFormatted = new Date(patientData.dob).toLocaleDateString('es-ES', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[600px] overflow-y-auto p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Contexto del Paciente</SheetTitle>
          <SheetDescription>
            Ver contexto del paciente incluyendo solicitudes activas, segmentos, actividad reciente e información de salud
          </SheetDescription>
        </SheetHeader>

        <div className="p-8 space-y-8">
          {/* Patient Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-3xl">{patientData.name}</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-3">
              {age} años ({dobFormatted})
            </p>
            <div className="inline-block px-3 py-1.5 bg-muted text-muted-foreground rounded-md">
              {patientData.mrn}
            </div>
          </div>

          {/* Active Requests */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>Solicitudes Activas</h3>
              <button className="flex items-center gap-1 text-[#6366F1] hover:underline">
                Ver Más
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {patientData.activeRequests.map((request) => (
                <div key={request.id} className="p-4 bg-muted/30 border border-border rounded-lg space-y-1">
                  <h4>{request.type}: {request.details}</h4>
                  <p className="text-sm text-muted-foreground">
                    Enviado: {formatDate(request.submittedDate)}
                  </p>
                  <p className={`text-sm ${getStatusColorClass(request.statusColor)}`}>
                    Estado: {request.status}
                  </p>
                </div>
              ))}
              {patientData.activeRequests.length === 0 && (
                <p className="text-sm text-muted-foreground py-2">No hay solicitudes activas</p>
              )}
            </div>
          </div>

          {/* Segments */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>Segmentos</h3>
              <button className="flex items-center gap-1 text-[#6366F1] hover:underline">
                Ver Más
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {patientData.segments.map((segment) => (
                <div key={segment.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Briefcase className="h-5 w-5 text-[#6366F1]" />
                    </div>
                    <div>
                      <h4 className="text-[#6366F1]">{segment.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {segment.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {patientData.segments.length === 0 && (
                <p className="text-sm text-muted-foreground py-2">No hay segmentos inscritos</p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>Actividad Reciente</h3>
              <button className="flex items-center gap-1 text-[#6366F1] hover:underline">
                Ver Más
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 bg-muted/30 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <h4>Citas</h4>
                  {patientData.recentActivity.appointments.upcoming && (
                    <p className="text-sm">
                      <span className="text-emerald-600">Próxima:</span>{" "}
                      <span className="text-muted-foreground">
                        {formatDate(patientData.recentActivity.appointments.upcoming.date)} con{" "}
                        {patientData.recentActivity.appointments.upcoming.provider}
                      </span>
                    </p>
                  )}
                  {patientData.recentActivity.appointments.past && (
                    <p className="text-sm">
                      <span>Pasada:</span>{" "}
                      <span className="text-muted-foreground">
                        {formatDate(patientData.recentActivity.appointments.past.date)} con{" "}
                        {patientData.recentActivity.appointments.past.provider}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Context */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>Contexto</h3>
              <button className="flex items-center gap-1 text-[#6366F1] hover:underline">
                Ver Más
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 bg-muted/30 border border-border rounded-lg space-y-4">
              {/* Healthcare Context */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4>Contexto de Salud</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Médico de Cabecera: <span className="text-foreground">{patientData.context.pcp}</span>
                  </p>
                </div>
              </div>

              {/* Family Portal Access */}
              {patientData.context.familyAccess.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4>Acceso al Portal Familiar</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {patientData.context.familyAccess.map((member, index) => (
                        <span key={index}>
                          {member.name} ({member.relation})
                          {index < patientData.context.familyAccess.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Primary Action */}
          <div className="pt-2">
            <Button className="w-full bg-[#6366F1] hover:bg-[#5558E3] text-white">
              Ver Perfil Completo del Paciente
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
