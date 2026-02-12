import { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  MoreVertical,
  Reply,
  FileText,
  Paperclip,
  Calendar,
  RotateCcw,
  X as XIcon,
  StickyNote,
  Plus,
  CheckCircle2,
  Pin,
  PinOff,
  BellOff,
  Bell,
  Archive,
  Search,
} from "lucide-react";

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  group: "messaging" | "turnos" | "notas" | "conversation";
  onSelect: () => void;
}

interface QuickActionsMenuProps {
  isPinned?: boolean;
  isMuted?: boolean;
  onReply?: () => void;
  onQuickReply?: () => void;
  onAttach?: () => void;
  onOpenTurno?: () => void;
  onReschedule?: () => void;
  onCancelAppointment?: () => void;
  onCreateNote?: () => void;
  onAddStatus?: () => void;
  onMarkResolved?: () => void;
  onTogglePin?: () => void;
  onToggleMute?: () => void;
  onArchive?: () => void;
}

export function QuickActionsMenu({
  isPinned = false,
  isMuted = false,
  onReply,
  onQuickReply,
  onAttach,
  onOpenTurno,
  onReschedule,
  onCancelAppointment,
  onCreateNote,
  onAddStatus,
  onMarkResolved,
  onTogglePin,
  onToggleMute,
  onArchive,
}: QuickActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Build actions array
  const actions: QuickAction[] = [
    // Messaging group
    ...(onReply ? [{
      id: "reply",
      label: "Responder",
      icon: <Reply className="h-4 w-4" />,
      shortcut: "⌘R",
      group: "messaging" as const,
      onSelect: onReply,
    }] : []),
    ...(onQuickReply ? [{
      id: "quick-reply",
      label: "Respuesta rápida",
      icon: <FileText className="h-4 w-4" />,
      shortcut: "⌘K",
      group: "messaging" as const,
      onSelect: onQuickReply,
    }] : []),
    ...(onAttach ? [{
      id: "attach",
      label: "Adjuntar archivo",
      icon: <Paperclip className="h-4 w-4" />,
      group: "messaging" as const,
      onSelect: onAttach,
    }] : []),

    // Turnos group
    ...(onOpenTurno ? [{
      id: "open-turno",
      label: "Abrir /turno",
      icon: <Calendar className="h-4 w-4" />,
      shortcut: "⌘T",
      group: "turnos" as const,
      onSelect: onOpenTurno,
    }] : []),
    ...(onReschedule ? [{
      id: "reschedule",
      label: "Reprogramar",
      icon: <RotateCcw className="h-4 w-4" />,
      group: "turnos" as const,
      onSelect: onReschedule,
    }] : []),
    ...(onCancelAppointment ? [{
      id: "cancel-appointment",
      label: "Cancelar turno",
      icon: <XIcon className="h-4 w-4" />,
      group: "turnos" as const,
      onSelect: onCancelAppointment,
    }] : []),

    // Notas & Eventos group
    ...(onCreateNote ? [{
      id: "create-note",
      label: "/nota",
      icon: <StickyNote className="h-4 w-4" />,
      shortcut: "⌘N",
      group: "notas" as const,
      onSelect: onCreateNote,
    }] : []),
    ...(onAddStatus ? [{
      id: "add-status",
      label: "Agregar estado",
      icon: <Plus className="h-4 w-4" />,
      group: "notas" as const,
      onSelect: onAddStatus,
    }] : []),
    ...(onMarkResolved ? [{
      id: "mark-resolved",
      label: "Marcar como resuelto",
      icon: <CheckCircle2 className="h-4 w-4" />,
      shortcut: "⌘⇧R",
      group: "notas" as const,
      onSelect: onMarkResolved,
    }] : []),

    // Conversación group
    ...(onTogglePin ? [{
      id: "toggle-pin",
      label: isPinned ? "Desfijar" : "Fijar conversación",
      icon: isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />,
      shortcut: "⌘P",
      group: "conversation" as const,
      onSelect: onTogglePin,
    }] : []),
    ...(onToggleMute ? [{
      id: "toggle-mute",
      label: isMuted ? "Activar notificaciones" : "Silenciar",
      icon: isMuted ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />,
      shortcut: "⌘M",
      group: "conversation" as const,
      onSelect: onToggleMute,
    }] : []),
    ...(onArchive ? [{
      id: "archive",
      label: "Archivar",
      icon: <Archive className="h-4 w-4" />,
      group: "conversation" as const,
      onSelect: onArchive,
    }] : []),
  ];

  // Filter actions based on search
  const filteredActions = searchQuery
    ? actions.filter((action) =>
        action.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : actions;

  // Group actions
  const groupedActions = filteredActions.reduce((acc, action) => {
    if (!acc[action.group]) {
      acc[action.group] = [];
    }
    acc[action.group].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  const groupLabels: Record<string, string> = {
    messaging: "Mensajería",
    turnos: "Turnos",
    notas: "Notas & Eventos",
    conversation: "Conversación",
  };

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Focus search input when menu opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredActions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredActions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].onSelect();
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[280px]"
        onKeyDown={handleKeyDown}
      >
        {/* Search */}
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Buscar acciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8 text-sm"
            />
          </div>
        </div>

        {/* Actions grouped by category */}
        {Object.keys(groupedActions).length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No se encontraron acciones
          </div>
        ) : (
          Object.entries(groupedActions).map(([group, groupActions], groupIndex) => (
            <div key={group}>
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                  {groupLabels[group]}
                </DropdownMenuLabel>
                {groupActions.map((action, actionIndex) => {
                  // Calculate global index
                  const globalIndex = Object.keys(groupedActions)
                    .slice(0, groupIndex)
                    .reduce((sum, g) => sum + groupedActions[g].length, 0) + actionIndex;

                  return (
                    <DropdownMenuItem
                      key={action.id}
                      onClick={(e) => {
                        e.preventDefault();
                        action.onSelect();
                        setIsOpen(false);
                      }}
                      className={`cursor-pointer ${
                        globalIndex === selectedIndex ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {action.icon}
                        <span>{action.label}</span>
                      </div>
                      {action.shortcut && (
                        <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
              {groupIndex < Object.keys(groupedActions).length - 1 && (
                <DropdownMenuSeparator />
              )}
            </div>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
