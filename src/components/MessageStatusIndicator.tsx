import { Check, CheckCheck, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export type MessageStatus = "pending" | "sent" | "delivered" | "read";

interface MessageStatusIndicatorProps {
  status: MessageStatus;
  timestamp: string;
  className?: string;
}

export function MessageStatusIndicator({ status, timestamp, className = "" }: MessageStatusIndicatorProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <Clock className="h-3.5 w-3.5 text-muted-foreground/60 animate-pulse" />;
      case "sent":
        return <Check className="h-3.5 w-3.5 text-muted-foreground/70" />;
      case "delivered":
        return (
          <div className="relative">
            <CheckCheck className="h-3.5 w-3.5 text-muted-foreground/70" />
          </div>
        );
      case "read":
        return (
          <div className="relative">
            <CheckCheck className="h-3.5 w-3.5 text-[#1A66FC]" />
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "pending":
        return "Enviando...";
      case "sent":
        return "Enviado";
      case "delivered":
        return "Entregado";
      case "read":
        return "Leído";
      default:
        return "";
    }
  };

  const getStatusDescription = () => {
    switch (status) {
      case "pending":
        return "El mensaje se está enviando";
      case "sent":
        return "Mensaje enviado exitosamente";
      case "delivered":
        return "Mensaje entregado al dispositivo del paciente";
      case "read":
        return "Mensaje leído por el paciente";
      default:
        return "";
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`flex items-center gap-1 transition-all duration-300 ease-in-out ${className}`}
            role="img"
            aria-label={getStatusDescription()}
          >
            <span className="text-[11px] opacity-70 select-none">
              {timestamp}
            </span>
            <div className="flex-shrink-0 transition-transform duration-200 ease-out scale-100 hover:scale-110">
              {getStatusIcon()}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="text-xs px-2 py-1"
          sideOffset={5}
        >
          <p>{getStatusLabel()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Hook to simulate progressive message status updates
 * This simulates real-world message delivery with realistic timing
 */
export function useMessageStatusSimulation(
  messageId: string,
  initialStatus: MessageStatus,
  onStatusChange: (messageId: string, newStatus: MessageStatus) => void
) {
  // Simulate status progression: pending -> sent -> delivered -> read
  const simulateStatusProgression = () => {
    // pending -> sent (500-1000ms)
    if (initialStatus === "pending") {
      const sentDelay = 500 + Math.random() * 500;
      setTimeout(() => {
        onStatusChange(messageId, "sent");
      }, sentDelay);
    }
    
    // sent -> delivered (1-2 seconds after sent)
    if (initialStatus === "pending" || initialStatus === "sent") {
      const deliveredDelay = (initialStatus === "pending" ? 1500 : 0) + 1000 + Math.random() * 1000;
      setTimeout(() => {
        onStatusChange(messageId, "delivered");
      }, deliveredDelay);
    }
    
    // delivered -> read (2-5 seconds after delivered, simulating patient reading)
    if (initialStatus === "pending" || initialStatus === "sent" || initialStatus === "delivered") {
      const readDelay = (initialStatus === "pending" ? 2500 : initialStatus === "sent" ? 1000 : 0) 
        + 2000 + Math.random() * 3000;
      setTimeout(() => {
        onStatusChange(messageId, "read");
      }, readDelay);
    }
  };

  return { simulateStatusProgression };
}
