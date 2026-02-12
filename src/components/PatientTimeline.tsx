import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Send,
  Paperclip,
  ChevronRight,
  ChevronLeft,
  User,
  Sparkles,
  CalendarPlus,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  SlashCommandMenu,
  SlashCommand,
  getFilteredCommands,
} from "./SlashCommandMenu";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { AppointmentWizard } from "./AppointmentWizard";
import { AttachmentMenu } from "./AttachmentMenu";
import { SystemEventMessage } from "./SystemEventMessage";
import { TypingIndicator } from "./TypingIndicator";
import { AppointmentBookingFlow } from "./AppointmentBookingFlow";
import {
  MessageStatusIndicator,
  MessageStatus,
} from "./MessageStatusIndicator";

type ViewMode = "active" | "history";

export type SystemEventType =
  | "internal_note"
  | "status_change"
  | "subject_change";

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  date: string;
  isOperator: boolean;
  status?: MessageStatus;
  isSystemEvent?: boolean;
  eventType?: SystemEventType;
  metadata?: {
    oldValue?: string;
    newValue?: string;
  };
}

export type TicketStatus = "New" | "Open" | "Pending" | "Resolved";

export interface PatientTicket {
  conversationId: string;
  subject: string;
  status: TicketStatus;
  closedDate?: string;
  messages: Message[];
}

interface PatientTimelineProps {
  patientName: string;
  primaryCarePhysician?: string;
  tickets: PatientTicket[];
  onSendMessage: (conversationId: string, text: string) => void;
  onOpenProfile: () => void;
  onStatusChange: (conversationId: string, status: TicketStatus) => void;
  onSimulateNewMessage?: (conversationId: string) => void;
  onSubjectChange?: (conversationId: string, newSubject: string) => void;
  isTyping?: boolean;
}

export function PatientTimeline({
  patientName,
  primaryCarePhysician,
  tickets,
  onSendMessage,
  onOpenProfile,
  onStatusChange,
  onSimulateNewMessage,
  onSubjectChange,
  isTyping = false,
}: PatientTimelineProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("active");
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashSearchQuery, setSlashSearchQuery] = useState("");
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const [hasUnreadInActiveChat, setHasUnreadInActiveChat] = useState(false);
  const [hasSimulatedMessage, setHasSimulatedMessage] = useState(false);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [newMessageId, setNewMessageId] = useState<string | null>(null);
  const [isClosingTicket, setIsClosingTicket] = useState(false);

  // Subject editing states
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [editedSubjectValue, setEditedSubjectValue] = useState("");

  // System events toggle
  const [showSystemEvents, setShowSystemEvents] = useState(true);

  // Appointment workflow states
  const [detectedAppointmentMessages, setDetectedAppointmentMessages] =
    useState<Set<string>>(new Set());
  const [loadingKeywords, setLoadingKeywords] = useState<Set<string>>(
    new Set(),
  );
  const [isWorkflowActive, setIsWorkflowActive] = useState(false);
  const [showBookingFlow, setShowBookingFlow] = useState(false);

  // Message status tracking (maps message ID to status)
  const [messageStatuses, setMessageStatuses] = useState<
    Record<string, MessageStatus>
  >({});

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeChatScrollRef = useRef<HTMLDivElement>(null);
  const ticketHeaderRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Filter tickets by status
  const openTickets = tickets.filter((t) => t.status !== "Resolved");
  const closedTickets = tickets.filter((t) => t.status === "Resolved");

  // Get the first open ticket for Active Chat view
  const activeTicket = openTickets.length > 0 ? openTickets[0] : null;

  // Calculate current ticket index for paginator (1-based) - used in Past Conversations view
  const currentTicketIndex = closedTickets.findIndex(
    (t) => t.conversationId === activeTicketId,
  );
  const currentTicketNumber =
    currentTicketIndex >= 0 ? currentTicketIndex + 1 : 1;
  const totalClosedTickets = closedTickets.length;

  // In Active Chat view: input is always enabled (unless no open ticket exists)
  // In Past Conversations view: input is never shown (read-only)
  const isInputEnabled = viewMode === "active" && activeTicket !== null;

  useEffect(() => {
    // In history view, track which ticket is at the top when scrolling
    const handleScroll = () => {
      if (viewMode !== "history" || !scrollContainerRef.current) return;

      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;

      // Find the ticket header that's currently visible at or near the top
      let closestTicketId: string | null = null;
      let closestDistance = Infinity;

      closedTickets.forEach((ticket) => {
        const headerElement = ticketHeaderRefs.current.get(
          ticket.conversationId,
        );
        if (headerElement) {
          const headerRect = headerElement.getBoundingClientRect();

          // Calculate distance from header to container top
          const distance = Math.abs(headerRect.top - containerTop);

          // Find the header closest to the top of the container
          // Only consider headers that are visible (not scrolled past completely)
          if (distance < closestDistance && headerRect.bottom > containerTop) {
            closestDistance = distance;
            closestTicketId = ticket.conversationId;
          }
        }
      });

      if (closestTicketId && closestTicketId !== activeTicketId) {
        setActiveTicketId(closestTicketId);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && viewMode === "history") {
      scrollContainer.addEventListener("scroll", handleScroll);
      // Run once on mount to set initial ticket
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [viewMode, closedTickets, activeTicketId]);

  // Set the first ticket as active on mount
  useEffect(() => {
    if (activeTicket) {
      setActiveTicketId(activeTicket.conversationId);
    }
  }, [activeTicket?.conversationId]);

  // When switching to history view, set the first closed ticket as active
  useEffect(() => {
    if (viewMode === "history" && closedTickets.length > 0) {
      // Check if current activeTicketId is in closedTickets, if not, set to first closed ticket
      const isCurrentTicketClosed = closedTickets.some(
        (t) => t.conversationId === activeTicketId,
      );
      if (!isCurrentTicketClosed) {
        setActiveTicketId(closedTickets[0].conversationId);
      }
    }
  }, [viewMode, closedTickets.length]);

  // Clear unread indicator when there are no open tickets
  useEffect(() => {
    if (!activeTicket) {
      setHasUnreadInActiveChat(false);
      setHasSimulatedMessage(false);
      setNewMessageId(null);
    }
  }, [activeTicket]);

  // Handle unread indicator and simulate new message when switching views
  useEffect(() => {
    if (
      viewMode === "history" &&
      !hasSimulatedMessage &&
      activeTicket &&
      onSimulateNewMessage
    ) {
      // Wait 1 second before showing unread indicator and simulating new message
      const timer = setTimeout(() => {
        // Store the ID that will be generated for the new message
        const simulatedMessageId = `m${Date.now()}`;
        setNewMessageId(simulatedMessageId);
        setHasUnreadInActiveChat(true);
        setHasSimulatedMessage(true);
        onSimulateNewMessage(activeTicket.conversationId);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (viewMode === "active" && hasUnreadInActiveChat) {
      // Auto-focus the input when switching back to Active Chat
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [
    viewMode,
    activeTicket?.conversationId,
    hasSimulatedMessage,
    onSimulateNewMessage,
  ]);

  const handleSend = () => {
    // In Active Chat view, always send to the first (active) ticket
    if (messageText.trim() && activeTicket && isInputEnabled) {
      // Replace @paciente with the active patient's name
      const processedMessage = messageText.replace(/@paciente/gi, patientName);
      onSendMessage(activeTicket.conversationId, processedMessage);
      setMessageText("");
      setSelectedFile(null);

      // Clear the unread indicator when operator sends a message
      setHasUnreadInActiveChat(false);
      setTimeout(() => {
        setNewMessageId(null);
      }, 3000); // Keep the animation for 3 seconds after sending
    }
  };

  // Detect appointment keywords in patient messages - only in active view and when workflow is not active
  useEffect(() => {
    if (!activeTicket || viewMode !== "active" || isWorkflowActive) return;

    activeTicket.messages.forEach((message) => {
      if (!message.isOperator && !detectedAppointmentMessages.has(message.id)) {
        const text = message.text.toLowerCase();
        // Only detect "cita" keyword
        const hasKeyword = /\bcita\b/i.test(text);

        if (hasKeyword) {
          // Wait 500ms before starting the detection animation
          setTimeout(() => {
            // Add to loading state
            setLoadingKeywords((prev) => new Set(prev).add(message.id));

            // After 1.5 seconds, move to detected state
            setTimeout(() => {
              setLoadingKeywords((prev) => {
                const newSet = new Set(prev);
                newSet.delete(message.id);
                return newSet;
              });
              setDetectedAppointmentMessages((prev) =>
                new Set(prev).add(message.id),
              );
            }, 1500);
          }, 500);
        }
      }
    });
  }, [activeTicket?.messages.length, viewMode, isWorkflowActive]);

  // Subject editing handlers
  const handleStartEditingSubject = (
    conversationId: string,
    currentSubject: string,
  ) => {
    setEditingSubjectId(conversationId);
    setEditedSubjectValue(currentSubject);
  };

  const handleSaveSubject = (conversationId: string) => {
    if (editedSubjectValue.trim() && onSubjectChange) {
      onSubjectChange(conversationId, editedSubjectValue.trim());
      toast.success("Asunto actualizado");
    }
    setEditingSubjectId(null);
    setEditedSubjectValue("");
  };

  const handleCancelEditingSubject = () => {
    setEditingSubjectId(null);
    setEditedSubjectValue("");
  };

  const handleSubjectKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    conversationId: string,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveSubject(conversationId);
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancelEditingSubject();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessageText(value);

    if (value === "/" || (value.startsWith("/") && !value.includes(" "))) {
      setShowSlashMenu(true);
      setSlashSearchQuery(value.slice(1));
      setSelectedCommandIndex(0);
    } else {
      setShowSlashMenu(false);
      setSlashSearchQuery("");
      setSelectedCommandIndex(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSlashMenu) {
      const filteredCommands = getFilteredCommands(slashSearchQuery);
      const maxIndex = filteredCommands.length - 1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCommandIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCommandIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setShowSlashMenu(false);
        setSlashSearchQuery("");
        setMessageText("");
        setSelectedCommandIndex(0);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (
          filteredCommands.length > 0 &&
          selectedCommandIndex >= 0 &&
          selectedCommandIndex < filteredCommands.length
        ) {
          handleSlashCommandSelect(filteredCommands[selectedCommandIndex]);
        }
        return;
      }
    } else {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    }
  };

  const handleSlashCommandSelect = (command: SlashCommand) => {
    // Handle special actions
    if (command.action === "close_ticket" && activeTicket) {
      handleStatusChangeWithToast(activeTicket.conversationId, "Resolved");
      setShowSlashMenu(false);
      setSlashSearchQuery("");
      setSelectedCommandIndex(0);
      setMessageText("");
      return;
    }

    // Default behavior: insert command text
    setMessageText(command.text);
    setShowSlashMenu(false);
    setSlashSearchQuery("");
    setSelectedCommandIndex(0);
    inputRef.current?.focus();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Attachment menu handlers
  const handleAttachDocument = () => {
    document.getElementById("file-upload-document")?.click();
  };

  const handleAttachMedia = () => {
    document.getElementById("file-upload-media")?.click();
  };

  const handleAttachCamera = () => {
    toast.info("Función de cámara próximamente disponible");
  };

  const handleAttachAudio = () => {
    toast.info("Función de audio próximamente disponible");
  };

  const handleAttachContact = () => {
    toast.info("Función de contacto próximamente disponible");
  };

  const handleAttachSurvey = () => {
    toast.info("Función de encuesta próximamente disponible");
  };

  const handleAttachEvent = () => {
    toast.info("Función de evento próximamente disponible");
  };

  const handleAttachSticker = () => {
    toast.info("Función de sticker próximamente disponible");
  };

  const handleStatusChangeWithToast = (
    conversationId: string,
    status: TicketStatus,
  ) => {
    if (status === "Resolved") {
      // Trigger closing animation
      setIsClosingTicket(true);

      // Wait for animation to complete before actually changing status
      setTimeout(() => {
        onStatusChange(conversationId, status);
        setIsClosingTicket(false);
      }, 1000); // Slower animation - 1000ms
    } else {
      // For non-resolved status changes, no animation needed
      onStatusChange(conversationId, status);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showSlashMenu &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSlashMenu(false);
        setSlashSearchQuery("");
        setSelectedCommandIndex(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSlashMenu]);

  useEffect(() => {
    if (showSlashMenu) {
      setSelectedCommandIndex(0);
    }
  }, [slashSearchQuery, showSlashMenu]);

  // Auto-scroll to bottom when new messages arrive in Active Chat
  useEffect(() => {
    if (viewMode === "active" && activeChatScrollRef.current && activeTicket) {
      activeChatScrollRef.current.scrollTop =
        activeChatScrollRef.current.scrollHeight;
    }
  }, [activeTicket?.messages.length, viewMode]);

  // Simulate progressive message status updates for operator messages
  useEffect(() => {
    tickets.forEach((ticket) => {
      ticket.messages.forEach((message) => {
        // Only track operator messages
        if (message.isOperator && !message.isSystemEvent) {
          const currentStatus =
            messageStatuses[message.id] || message.status || "pending";

          // If message doesn't have a status yet, initialize it and start progression
          if (!messageStatuses[message.id]) {
            setMessageStatuses((prev) => ({
              ...prev,
              [message.id]: currentStatus,
            }));

            // Start status progression
            simulateStatusProgression(message.id, currentStatus);
          }
        }
      });
    });
  }, [tickets]);

  const simulateStatusProgression = (
    messageId: string,
    initialStatus: MessageStatus,
  ) => {
    // pending -> sent (500-1000ms)
    if (initialStatus === "pending") {
      const sentDelay = 500 + Math.random() * 500;
      setTimeout(() => {
        setMessageStatuses((prev) => ({
          ...prev,
          [messageId]: "sent",
        }));
      }, sentDelay);
    }

    // sent -> delivered (1-2 seconds after sent)
    if (initialStatus === "pending" || initialStatus === "sent") {
      const deliveredDelay =
        (initialStatus === "pending" ? 1500 : 0) + 1000 + Math.random() * 1000;
      setTimeout(() => {
        setMessageStatuses((prev) => ({
          ...prev,
          [messageId]: "delivered",
        }));
      }, deliveredDelay);
    }

    // delivered -> read (2-5 seconds after delivered, simulating patient reading)
    if (
      initialStatus === "pending" ||
      initialStatus === "sent" ||
      initialStatus === "delivered"
    ) {
      const readDelay =
        (initialStatus === "pending"
          ? 2500
          : initialStatus === "sent"
            ? 1000
            : 0) +
        2000 +
        Math.random() * 3000;
      setTimeout(() => {
        setMessageStatuses((prev) => ({
          ...prev,
          [messageId]: "read",
        }));
      }, readDelay);
    }
  };

  const getStatusVariant = (
    status: TicketStatus,
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "New":
        return "default";
      case "Open":
        return "secondary";
      case "Pending":
        return "outline";
      case "Resolved":
        return "secondary";
      default:
        return "default";
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { date: string; displayDate: string; messages: Message[] }[] =
      [];

    messages.forEach((message) => {
      const lastGroup = groups[groups.length - 1];

      if (!lastGroup || lastGroup.date !== message.date) {
        groups.push({
          date: message.date,
          displayDate: formatDateDivider(message.date),
          messages: [message],
        });
      } else {
        lastGroup.messages.push(message);
      }
    });

    return groups;
  };

  const formatDateDivider = (dateString: string): string => {
    const [year, month, day] = dateString.split('-').map(Number);
    const messageDate = new Date(year, month - 1, day);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    messageDate.setHours(0, 0, 0, 0);

    if (messageDate.getTime() === today.getTime()) {
      return `Hoy, ${messageDate.toLocaleDateString("es-ES", { month: "long", day: "numeric" })}`;
    } else if (messageDate.getTime() === yesterday.getTime()) {
      return `Ayer, ${messageDate.toLocaleDateString("es-ES", { month: "long", day: "numeric" })}`;
    } else {
      return messageDate.toLocaleDateString("es-ES", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const getInputPlaceholder = () => {
    if (!isInputEnabled) {
      if (activeTicket && activeTicket.status === "Resolved") {
        return "Este ticket está cerrado";
      }
      return "No se puede responder a este ticket";
    }
    return "Escribe un mensaje o / para acciones rápidas...";
  };

  const scrollToTicket = (ticketIndex: number) => {
    if (ticketIndex < 0 || ticketIndex >= closedTickets.length) return;

    const ticket = closedTickets[ticketIndex];
    const headerElement = ticketHeaderRefs.current.get(ticket.conversationId);

    if (headerElement && scrollContainerRef.current) {
      // Calculate the position to scroll to
      const headerRect = headerElement.getBoundingClientRect();
      const containerRect = scrollContainerRef.current.getBoundingClientRect();

      // Get current scroll position
      const currentScrollTop = scrollContainerRef.current.scrollTop;

      // Calculate offset from container top
      const offsetFromTop = headerRect.top - containerRect.top;

      // Scroll to position the header at the very top (accounting for current scroll)
      const targetScrollTop = currentScrollTop + offsetFromTop;

      scrollContainerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousTicket = () => {
    if (currentTicketIndex > 0) {
      const prevTicket = closedTickets[currentTicketIndex - 1];
      setActiveTicketId(prevTicket.conversationId);
      scrollToTicket(currentTicketIndex - 1);
    }
  };

  const handleNextTicket = () => {
    if (currentTicketIndex < closedTickets.length - 1) {
      const nextTicket = closedTickets[currentTicketIndex + 1];
      setActiveTicketId(nextTicket.conversationId);
      scrollToTicket(currentTicketIndex + 1);
    }
  };

  // Appointment Booking Flow handlers
  const handleStartWorkflow = () => {
    setShowBookingFlow(true);
  };

  const handleCloseWorkflow = () => {
    setIsWorkflowActive(false);
  };

  const handleConfirmAppointment = (appointment: {
    type: string;
    doctor: string;
    date: Date;
    time: string;
  }) => {
    if (!activeTicket) return;

    const appointmentMessage = `✅ Cita confirmada:\n\n📅 Tipo: ${
      appointment.type === "general"
        ? "Consulta General"
        : appointment.type === "specialist"
          ? "Especialista"
          : "Estudio/Laboratorio"
    }\n👨‍⚕️ Doctor: ${appointment.doctor}\n📆 Fecha: ${appointment.date.toLocaleDateString(
      "es-ES",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    )}\n🕐 Hora: ${appointment.time}\n\n¡Nos vemos pronto!`;

    onSendMessage(activeTicket.conversationId, appointmentMessage);
    setIsWorkflowActive(false);

    toast.success("Cita agendada exitosamente");
  };

  const handleCloseBookingFlow = () => {
    setShowBookingFlow(false);
  };

  const handleCompleteBooking = (appointmentDetails: any) => {
    if (!activeTicket) return;

    const appointmentMessage = `✅ Turno confirmado:\n\n📋 Paciente: ${appointmentDetails.patient}\n🏥 Cobertura: ${appointmentDetails.coverage}\n🩺 Especialidad: ${appointmentDetails.specialty}\n👨‍⚕️ Profesional: ${appointmentDetails.professional}\n📍 Sede: ${appointmentDetails.location}\n📅 Fecha: ${appointmentDetails.date}\n🕐 Hora: ${appointmentDetails.time}\n${appointmentDetails.type === "virtual" ? "💻 Modalidad: Consulta virtual" : "🏥 Modalidad: Consulta presencial"}\n\n¡Turno agendado exitosamente!`;

    onSendMessage(activeTicket.conversationId, appointmentMessage);
    setShowBookingFlow(false);

    toast.success("Turno agendado exitosamente");
  };

  return (
    <div className="h-full flex bg-white relative overflow-hidden">
      {/* Main chat area */}
      <motion.div
        className="flex flex-col h-full min-w-0"
        animate={{
          width: showBookingFlow ? "50%" : "100%",
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* FIXED Master Patient Header with Tabs */}
        <div className="border-b border-border bg-[rgb(248,249,251)] flex-shrink-0 relative z-20">
          {/* Patient name row */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-foreground text-[16px] font-bold truncate min-w-0">
                {patientName}
              </h2>

              <Button
                variant="ghost"
                onClick={onOpenProfile}
                aria-label="Ver perfil del paciente"
                className="flex items-center gap-2 flex-shrink-0"
              >
                <User className="h-4 w-4" />
                <span className="hidden md:inline">
                  Ver Perfil del Paciente
                </span>
                <span className="md:hidden">Perfil</span>
              </Button>
            </div>
          </div>

          {/* Tabs row with centered paginator */}
          <div className="px-4 pb-4 relative flex items-center min-h-[44px]">
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as ViewMode)}
              className="flex-shrink-0"
            >
              <TabsList>
                <TabsTrigger value="active">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out ${
                        hasUnreadInActiveChat
                          ? "bg-emerald-500 shadow-[0_0_0_1.5px_rgba(16,185,129,0.3)] animate-pulse-dot"
                          : "bg-gray-400 shadow-[0_0_0_1.5px_rgba(156,163,175,0.3)]"
                      }`}
                    />
                    <span className="whitespace-nowrap">Chat Activo</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="history">
                  <span className="whitespace-nowrap">
                    Conversaciones Pasadas ({totalClosedTickets})
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Ticket Paginator - Absolutely centered, only shown in Past Conversations view */}
            {viewMode === "history" && totalClosedTickets > 0 && (
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePreviousTicket}
                  disabled={currentTicketIndex === 0}
                  aria-label="Ticket anterior"
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {currentTicketNumber} de {totalClosedTickets}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextTicket}
                  disabled={currentTicketIndex === totalClosedTickets - 1}
                  aria-label="Siguiente ticket"
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area - Conditionally render based on view mode */}
        {viewMode === "active" ? (
          /* ACTIVE CHAT VIEW - Open tickets only */
          <div className="flex-1 flex flex-col min-h-0">
            <AnimatePresence mode="wait">
              {activeTicket && !isClosingTicket ? (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 1, ease: "easeInOut" },
                  }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  {/* Fixed Ticket Header for Active Chat */}
                  <div className="p-4 border-b border-border bg-[rgb(248,249,251)] flex-shrink-0 shadow-[0_12px_24px_-4px_rgba(255,255,255,0.6)]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        {editingSubjectId === activeTicket.conversationId ? (
                          <div className="flex-1 flex items-center gap-2">
                            <span className="text-muted-foreground text-sm flex-shrink-0">
                              Asunto:
                            </span>
                            <Input
                              value={editedSubjectValue}
                              onChange={(e) =>
                                setEditedSubjectValue(e.target.value)
                              }
                              onKeyDown={(e) =>
                                handleSubjectKeyDown(
                                  e,
                                  activeTicket.conversationId,
                                )
                              }
                              onBlur={() =>
                                handleSaveSubject(activeTicket.conversationId)
                              }
                              className="flex-1 h-8 text-sm"
                              autoFocus
                              placeholder="Ingrese el asunto..."
                            />
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              handleStartEditingSubject(
                                activeTicket.conversationId,
                                activeTicket.subject,
                              )
                            }
                            className="flex-1 text-left group flex items-center gap-2 rounded px-2 py-1 -mx-2 -my-1 hover:bg-[#f0f0f0] transition-colors"
                            title="Haz clic para editar el asunto"
                          >
                            <span className="text-muted-foreground text-sm">
                              Asunto:
                            </span>
                            <span className="text-muted-foreground line-clamp-1 flex-1">
                              {activeTicket.subject}
                            </span>
                            <span className="text-[#1A66FC] text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                              Editar
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Estado:
                          </span>
                          <Select
                            value={activeTicket.status}
                            onValueChange={(status) =>
                              handleStatusChangeWithToast(
                                activeTicket.conversationId,
                                status as TicketStatus,
                              )
                            }
                            disabled={isClosingTicket}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New">
                                <Badge variant={getStatusVariant("New")}>
                                  Nuevo
                                </Badge>
                              </SelectItem>
                              <SelectItem value="Open">
                                <Badge variant={getStatusVariant("Open")}>
                                  Abierto
                                </Badge>
                              </SelectItem>
                              <SelectItem value="Pending">
                                <Badge variant={getStatusVariant("Pending")}>
                                  Pendiente
                                </Badge>
                              </SelectItem>
                              <SelectItem value="Resolved">
                                <Badge variant={getStatusVariant("Resolved")}>
                                  Resuelto
                                </Badge>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSystemEvents(!showSystemEvents)}
                          className="h-8 gap-2"
                        >
                          {showSystemEvents ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                          <span className="text-xs">
                            {showSystemEvents
                              ? "Ocultar detalles"
                              : "Mostrar detalles"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Messages for Active Chat */}
                  <div
                    ref={activeChatScrollRef}
                    className="flex-1 overflow-y-auto"
                  >
                    <div className="p-4 pb-32">
                      {(() => {
                        const messageGroups = groupMessagesByDate(
                          activeTicket.messages,
                        );
                        return (
                          <div className="flex flex-col gap-6 max-w-[800px] mx-auto">
                            {messageGroups.map((group, groupIndex) => (
                              <div
                                key={`${activeTicket.conversationId}-${group.date}`}
                              >
                                <div className="flex items-center justify-center mb-4">
                                  <div className="px-3 py-1 bg-muted rounded-full">
                                    <p className="text-xs text-muted-foreground">
                                      {group.displayDate}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col">
                                  {group.messages.map((message, index) => {
                                    // Skip system events if toggle is off
                                    if (
                                      message.isSystemEvent &&
                                      !showSystemEvents
                                    ) {
                                      return null;
                                    }

                                    // Render system events differently
                                    if (
                                      message.isSystemEvent &&
                                      message.eventType
                                    ) {
                                      return (
                                        <SystemEventMessage
                                          key={message.id}
                                          eventType={message.eventType}
                                          text={message.text}
                                          timestamp={message.timestamp}
                                          metadata={message.metadata}
                                        />
                                      );
                                    }

                                    // Check if this is the new simulated message
                                    const isNewMessage =
                                      !message.isOperator &&
                                      newMessageId &&
                                      message ===
                                        activeTicket.messages[
                                          activeTicket.messages.length - 1
                                        ];

                                    // Check if next message is from a different sender
                                    const nextMessage =
                                      group.messages[index + 1];
                                    const isLastMessage =
                                      index === group.messages.length - 1;
                                    const nextMessageFromDifferentSender =
                                      !isLastMessage &&
                                      nextMessage.isOperator !==
                                        message.isOperator;

                                    // Apply smaller spacing for consecutive messages from same sender,
                                    // larger spacing when sender changes
                                    const marginBottom = isLastMessage
                                      ? ""
                                      : nextMessageFromDifferentSender
                                        ? "mb-6"
                                        : "mb-1";

                                    const hasAppointmentIntent =
                                      !message.isOperator &&
                                      detectedAppointmentMessages.has(
                                        message.id,
                                      );
                                    const isLoadingKeyword =
                                      !message.isOperator &&
                                      loadingKeywords.has(message.id);

                                    // Function to highlight only "cita" keyword
                                    const highlightKeywords = (
                                      text: string,
                                    ) => {
                                      if (
                                        !hasAppointmentIntent &&
                                        !isLoadingKeyword
                                      )
                                        return text;

                                      // Only highlight "cita" (word boundary)
                                      const regex = /\b(cita)\b/gi;
                                      const parts = text.split(regex);

                                      return parts.map((part, i) => {
                                        const isKeyword = /^cita$/i.test(part);
                                        if (isKeyword) {
                                          return (
                                            <span
                                              key={i}
                                              className="bg-amber-200/60 text-foreground px-1 rounded"
                                            >
                                              {part}
                                            </span>
                                          );
                                        }
                                        return part;
                                      });
                                    };

                                    return (
                                      <div
                                        key={message.id}
                                        className={marginBottom}
                                      >
                                        <div
                                          className={`flex items-center ${message.isOperator ? "justify-end" : "justify-start"}`}
                                        >
                                          <div
                                            className={`max-w-[700px] rounded-lg p-3 ${
                                              message.isOperator
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-foreground"
                                            } ${isNewMessage ? "animate-laser-beam" : ""}`}
                                          >
                                            <p>
                                              {highlightKeywords(message.text)}
                                            </p>
                                            <div className="flex items-center justify-end mt-1 gap-1">
                                              {message.isOperator ? (
                                                <MessageStatusIndicator
                                                  status={
                                                    messageStatuses[
                                                      message.id
                                                    ] ||
                                                    message.status ||
                                                    "pending"
                                                  }
                                                  timestamp={message.timestamp}
                                                  className="text-primary-foreground/80"
                                                />
                                              ) : (
                                                <p
                                                  className={`text-xs ${
                                                    message.isOperator
                                                      ? "text-primary-foreground/80"
                                                      : "text-foreground/60"
                                                  }`}
                                                >
                                                  {message.timestamp}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                          {isLoadingKeyword && (
                                            <div className="ml-3">
                                              <Sparkles className="h-5 w-5 text-amber-500 animate-sparkle" />
                                            </div>
                                          )}
                                        </div>

                                        {/* Workflow Button */}
                                        {hasAppointmentIntent &&
                                          !isLoadingKeyword &&
                                          !isWorkflowActive && (
                                            <motion.div
                                              initial={{ opacity: 0, y: -10 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              className="flex justify-start mt-2"
                                            >
                                              <Button
                                                onClick={handleStartWorkflow}
                                                variant="outline"
                                                size="sm"
                                                className="gap-2 bg-white hover:bg-primary/5 border-primary/30 text-primary"
                                              >
                                                <CalendarPlus className="h-4 w-4" />
                                                Iniciar Flujo de Agendamiento
                                              </Button>
                                            </motion.div>
                                          )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}

                            {/* Typing Indicator - show after all messages */}
                            {isTyping && (
                              <div className="flex items-center justify-start mt-4">
                                <TypingIndicator />
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              ) : !isClosingTicket ? (
                /* Empty state when no open tickets */
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex items-center justify-center"
                >
                  <div className="text-center text-muted-foreground">
                    <p>No hay conversaciones activas</p>
                    <p className="text-sm mt-1">
                      Todos los tickets han sido resueltos
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ) : /* PAST CONVERSATIONS VIEW (Closed Tickets Only) */
        closedTickets.length > 0 ? (
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
            <div className="pb-32">
              {closedTickets.map((ticket, index) => {
                const messageGroups = groupMessagesByDate(ticket.messages);
                const isLastTicket = index === closedTickets.length - 1;

                return (
                  <div key={ticket.conversationId}>
                    {/* Sticky Ticket Header */}
                    <div
                      ref={(el) => {
                        if (el) {
                          ticketHeaderRefs.current.set(
                            ticket.conversationId,
                            el,
                          );
                        }
                      }}
                      data-ticket-id={ticket.conversationId}
                      className="sticky top-0 z-10 bg-[rgb(248,249,251)] p-4 border-b border-border shadow-[0_12px_24px_-4px_rgba(255,255,255,0.6)]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                          {editingSubjectId === ticket.conversationId ? (
                            <div className="flex-1 flex items-center gap-2">
                              <span className="text-muted-foreground text-sm flex-shrink-0">
                                Asunto:
                              </span>
                              <Input
                                value={editedSubjectValue}
                                onChange={(e) =>
                                  setEditedSubjectValue(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  handleSubjectKeyDown(e, ticket.conversationId)
                                }
                                onBlur={() =>
                                  handleSaveSubject(ticket.conversationId)
                                }
                                className="flex-1 h-8 text-sm"
                                autoFocus
                                placeholder="Ingrese el asunto..."
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                handleStartEditingSubject(
                                  ticket.conversationId,
                                  ticket.subject,
                                )
                              }
                              className="flex-1 text-left group flex items-center gap-2 rounded px-2 py-1 -mx-2 -my-1 hover:bg-[#f0f0f0] transition-colors"
                              title="Haz clic para editar el asunto"
                            >
                              <span className="text-muted-foreground text-sm">
                                Asunto:
                              </span>
                              <span className="text-muted-foreground line-clamp-1 flex-1">
                                {ticket.subject}
                              </span>
                              <span className="text-[#1A66FC] text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                Editar
                              </span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {ticket.status === "Resolved" && ticket.closedDate ? (
                            <p className="text-sm text-muted-foreground">
                              Estado:{" "}
                              <span className="text-foreground">
                                Cerrado el {ticket.closedDate}
                              </span>
                            </p>
                          ) : (
                            <>
                              <span className="text-sm text-muted-foreground">
                                Estado:
                              </span>
                              <Badge variant={getStatusVariant(ticket.status)}>
                                {ticket.status}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Messages for This Ticket */}
                    <div className="p-4">
                      <div className="flex flex-col gap-6 max-w-[800px] mx-auto">
                        {messageGroups.map((group) => (
                          <div key={`${ticket.conversationId}-${group.date}`}>
                            <div className="flex items-center justify-center mb-4">
                              <div className="px-3 py-1 bg-muted rounded-full">
                                <p className="text-xs text-muted-foreground">
                                  {group.displayDate}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col">
                              {group.messages.map((message, index) => {
                                // Skip system events if toggle is off
                                if (
                                  message.isSystemEvent &&
                                  !showSystemEvents
                                ) {
                                  return null;
                                }

                                // Render system events differently
                                if (
                                  message.isSystemEvent &&
                                  message.eventType
                                ) {
                                  return (
                                    <SystemEventMessage
                                      key={message.id}
                                      eventType={message.eventType}
                                      text={message.text}
                                      timestamp={message.timestamp}
                                      metadata={message.metadata}
                                    />
                                  );
                                }

                                // Check if next message is from a different sender
                                const nextMessage = group.messages[index + 1];
                                const isLastMessage =
                                  index === group.messages.length - 1;
                                const nextMessageFromDifferentSender =
                                  !isLastMessage &&
                                  nextMessage.isOperator !== message.isOperator;

                                // Apply smaller spacing for consecutive messages from same sender,
                                // larger spacing when sender changes
                                const marginBottom = isLastMessage
                                  ? ""
                                  : nextMessageFromDifferentSender
                                    ? "mb-6"
                                    : "mb-1";

                                return (
                                  <div
                                    key={message.id}
                                    className={`flex ${message.isOperator ? "justify-end" : "justify-start"} ${marginBottom}`}
                                  >
                                    <div
                                      className={`max-w-[70%] rounded-lg p-3 ${
                                        message.isOperator
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted text-foreground"
                                      }`}
                                    >
                                      <p>{message.text}</p>
                                      <p
                                        className={`text-xs mt-1 ${
                                          message.isOperator
                                            ? "text-primary-foreground/80"
                                            : "text-foreground/60"
                                        }`}
                                      >
                                        {message.timestamp}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Typing Indicator - show in active view only, on the last ticket */}
                      {isTyping && viewMode === "active" && isLastTicket && (
                        <div className="px-4 max-w-[800px] mx-auto">
                          <TypingIndicator />
                        </div>
                      )}
                    </div>

                    {/* Divider between tickets (except for last one) */}
                    {!isLastTicket && (
                      <div className="mx-4 mb-6 border-t-2 border-dashed border-border"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Empty state when no closed tickets */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>No hay conversaciones pasadas</p>
              <p className="text-sm mt-1">
                Las conversaciones cerradas aparecerán aquí
              </p>
            </div>
          </div>
        )}

        {/* Fixed Message Composer - Only shown in Active Chat view when there's an active ticket */}
        {viewMode === "active" && activeTicket && !isClosingTicket && (
          <div className="p-4 border-t border-border bg-white flex-shrink-0">
            {selectedFile && (
              <div className="mb-2 p-2 bg-muted rounded flex items-center justify-between">
                <span className="text-sm truncate">{selectedFile.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  Eliminar
                </Button>
              </div>
            )}
            {/* Active Message Input - Always enabled in Active Chat view */}
            <div className="flex items-end gap-2 relative">
              <div className="flex-1 relative">
                {showSlashMenu && (
                  <SlashCommandMenu
                    searchQuery={slashSearchQuery}
                    selectedIndex={selectedCommandIndex}
                    onSelect={handleSlashCommandSelect}
                  />
                )}
                <Input
                  ref={inputRef}
                  value={messageText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={getInputPlaceholder()}
                  className="resize-none transition-all duration-300 ease-out h-10 focus-visible:h-14 focus-visible:ring-0 focus-visible:shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_0_24px_rgba(0,0,0,0.04)] focus-visible:border-black/10 focus-visible:bg-white"
                />
              </div>
              <input
                type="file"
                id="file-upload-document"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt"
              />
              <input
                type="file"
                id="file-upload-media"
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,video/*"
              />
              <AttachmentMenu
                onAttachDocument={handleAttachDocument}
                onAttachMedia={handleAttachMedia}
                onAttachCamera={handleAttachCamera}
                onAttachAudio={handleAttachAudio}
                onAttachContact={handleAttachContact}
                onAttachSurvey={handleAttachSurvey}
                onAttachEvent={handleAttachEvent}
                onAttachSticker={handleAttachSticker}
              />
              <Button
                onClick={handleSend}
                disabled={!messageText.trim()}
                aria-label="Enviar mensaje"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Appointment Wizard Panel - 70% width on right side */}
      {isWorkflowActive && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "70%", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <AppointmentWizard
            patientName={patientName}
            primaryCarePhysician={primaryCarePhysician}
            onClose={handleCloseWorkflow}
            onConfirm={handleConfirmAppointment}
          />
        </motion.div>
      )}

      {/* Appointment Booking Flow Side Panel */}
      <AnimatePresence>
        {showBookingFlow && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="w-[50%] h-full border-l border-border bg-white flex-shrink-0"
          >
            <AppointmentBookingFlow
              patientName={patientName}
              onClose={handleCloseBookingFlow}
              onComplete={handleCompleteBooking}
              isPanel={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
