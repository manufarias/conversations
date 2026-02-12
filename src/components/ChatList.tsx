import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Pin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export interface PatientConversation {
  patientId: string;
  patientName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  unreadCount: number;
  totalTickets: number;
  channel?: "whatsapp" | "email";
  isPinned?: boolean;
}

interface ChatListProps {
  patients: PatientConversation[];
  activePatientId: string | null;
  onSelectPatient: (patientId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  fadingOutPatientId?: string | null;
}

export function ChatList({ patients, activePatientId, onSelectPatient, isCollapsed, onToggleCollapse, fadingOutPatientId }: ChatListProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isCollapsed) {
    // Collapsed state: Show narrow icon rail with patient initials
    return (
      <div className="h-full flex flex-col border-r border-border bg-background w-full">
        {/* Toggle button at top */}
        <div className="p-2 border-b border-border flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            aria-label="Expandir barra lateral"
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Patient icons */}
        <ScrollArea className="flex-1">
          <TooltipProvider>
            <div className="flex flex-col items-center py-2">
              {patients.map((patient) => (
                <Tooltip key={patient.patientId}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onSelectPatient(patient.patientId)}
                      className={`relative my-1 rounded-md transition-colors ${
                        activePatientId === patient.patientId ? 'bg-accent' : 'hover:bg-accent'
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getInitials(patient.patientName)}</AvatarFallback>
                      </Avatar>
                      {patient.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#9CA3AF] text-white text-[10px]">
                          {patient.unreadCount}
                        </div>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{patient.patientName}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </ScrollArea>
      </div>
    );
  }

  // Expanded state: Show full sidebar with all details
  return (
    <div className="h-full w-full flex flex-col border-r border-border bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2>Conversaciones Activas</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          aria-label="Contraer barra lateral"
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {patients.map((patient) => (
            <button
              key={patient.patientId}
              onClick={() => onSelectPatient(patient.patientId)}
              className={`w-full border-b border-border hover:bg-[#F8F9FB] text-left overflow-hidden ${
                activePatientId === patient.patientId ? 'bg-[#F8F9FB]' : 'bg-white'
              } ${
                fadingOutPatientId === patient.patientId 
                  ? 'opacity-0 scale-95 max-h-0 py-0 px-4 transition-all duration-[2000ms]' 
                  : 'opacity-100 scale-100 max-h-[500px] p-4'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    {patient.isPinned && (
                      <Pin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    )}
                    <p className={`truncate ${activePatientId === patient.patientId ? 'font-medium' : ''}`}>
                      {patient.patientName}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {patient.timestamp}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-foreground/60 truncate flex-1">
                    {patient.lastMessage}
                  </p>
                  {patient.unreadCount > 0 && (
                    <div className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#9CA3AF] text-white text-xs shrink-0">
                      {patient.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
