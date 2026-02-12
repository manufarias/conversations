import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { MessageSquare, Key, FileText, Heart, Phone, CheckCircle2, Calendar, StickyNote, Pin, Archive, Bell, BellOff } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

export interface SlashCommand {
  name: string;
  trigger: string;
  description: string;
  text?: string;
  icon: React.ReactNode;
  action?: "close_ticket" | "open_turno" | "create_nota" | "pin_conversation" | "archive_conversation" | "mute_conversation";
  category: "messaging" | "turnos" | "notas" | "conversation";
  shortcut?: string;
  allowsParameters?: boolean;
}

export const enhancedSlashCommands: SlashCommand[] = [
  // Messaging
  {
    name: "Saludo",
    trigger: "saludo",
    description: "Mensaje de bienvenida estándar",
    text: "Hola, mi nombre es [Operador] y estaré encantado de ayudarle. ¿En qué puedo asistirle hoy?",
    icon: <MessageSquare className="h-4 w-4" />,
    category: "messaging",
    shortcut: "⌘S",
  },
  {
    name: "Restablecer Contraseña",
    trigger: "contraseña",
    description: "Pasos para restablecer contraseña",
    text: "Puede restablecer su contraseña del portal visitando [enlace]. Por favor avíseme si tiene algún problema.",
    icon: <Key className="h-4 w-4" />,
    category: "messaging",
  },
  {
    name: "Verificar Resultados",
    trigger: "resultados",
    description: "Cómo encontrar resultados de laboratorio",
    text: "Los resultados de las pruebas suelen estar disponibles en la sección 'Mis Resultados' entre 3-5 días después de su visita. ¿Ya lo revisó?",
    icon: <FileText className="h-4 w-4" />,
    category: "messaging",
  },
  {
    name: "Empatía",
    trigger: "empatia",
    description: "Reconocer frustración del paciente",
    text: "Entiendo que esto debe ser frustrante, y me disculpo por el inconveniente. Trabajemos juntos para resolverlo.",
    icon: <Heart className="h-4 w-4" />,
    category: "messaging",
    shortcut: "⌘E",
  },
  {
    name: "Transferir",
    trigger: "transferir",
    description: "Transferir a otro departamento",
    text: "Para este asunto, necesitaré transferirle a [departamento]. ¿Le gustaría que lo hiciera ahora?",
    icon: <Phone className="h-4 w-4" />,
    category: "messaging",
  },

  // Turnos
  {
    name: "Abrir Turno",
    trigger: "turno",
    description: "Abrir flujo de agendamiento de citas (soporta parámetros: especialidad, hora, modalidad)",
    icon: <Calendar className="h-4 w-4" />,
    category: "turnos",
    action: "open_turno",
    shortcut: "⌘T",
    allowsParameters: true,
  },

  // Notas & Eventos
  {
    name: "Nota Interna",
    trigger: "nota",
    description: "Crear nota interna (solo visible para operadores)",
    icon: <StickyNote className="h-4 w-4" />,
    category: "notas",
    action: "create_nota",
    shortcut: "⌘N",
    allowsParameters: true,
  },
  {
    name: "Marcar Resuelto",
    trigger: "cerrar",
    description: "Marcar conversación como resuelta",
    icon: <CheckCircle2 className="h-4 w-4" />,
    category: "notas",
    action: "close_ticket",
    shortcut: "⌘R",
  },

  // Conversación
  {
    name: "Fijar Conversación",
    trigger: "pin",
    description: "Fijar/desfijar esta conversación al inicio",
    icon: <Pin className="h-4 w-4" />,
    category: "conversation",
    action: "pin_conversation",
    shortcut: "⌘P",
  },
  {
    name: "Silenciar",
    trigger: "silenciar",
    description: "Silenciar notificaciones de esta conversación",
    icon: <BellOff className="h-4 w-4" />,
    category: "conversation",
    action: "mute_conversation",
  },
  {
    name: "Archivar",
    trigger: "archivar",
    description: "Archivar esta conversación",
    icon: <Archive className="h-4 w-4" />,
    category: "conversation",
    action: "archive_conversation",
  },
];

interface EnhancedSlashCommandMenuProps {
  searchQuery: string;
  selectedIndex: number;
  onSelect: (command: SlashCommand, parameters?: string) => void;
  onSearchChange?: (query: string) => void;
}

const categoryLabels: Record<string, string> = {
  messaging: "Mensajería",
  turnos: "Turnos",
  notas: "Notas & Eventos",
  conversation: "Conversación",
};

export function EnhancedSlashCommandMenu({ 
  searchQuery, 
  selectedIndex, 
  onSelect,
  onSearchChange 
}: EnhancedSlashCommandMenuProps) {
  const [internalSearch, setInternalSearch] = useState("");
  
  const effectiveSearch = searchQuery || internalSearch;

  const filteredCommands = enhancedSlashCommands.filter((cmd) => 
    cmd.trigger.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
    cmd.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
    cmd.description.toLowerCase().includes(effectiveSearch.toLowerCase())
  );

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, SlashCommand[]>);

  const categories = Object.keys(groupedCommands) as Array<keyof typeof categoryLabels>;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 z-50">
      <div className="bg-popover border border-border rounded-md shadow-lg max-w-2xl mx-auto">
        <Command shouldFilter={false}>
          {/* Search within menu */}
          <div className="px-3 py-2 border-b border-border">
            <Input
              placeholder="Buscar comandos..."
              value={internalSearch}
              onChange={(e) => {
                setInternalSearch(e.target.value);
                onSearchChange?.(e.target.value);
              }}
              className="h-8 text-sm"
            />
          </div>

          <CommandList className="max-h-[400px]">
            {filteredCommands.length === 0 ? (
              <CommandEmpty>No se encontraron comandos.</CommandEmpty>
            ) : (
              <>
                {categories.map((category, catIndex) => (
                  <div key={category}>
                    <CommandGroup heading={categoryLabels[category]}>
                      {groupedCommands[category].map((command, index) => {
                        // Calculate global index
                        const globalIndex = categories
                          .slice(0, catIndex)
                          .reduce((sum, cat) => sum + groupedCommands[cat].length, 0) + index;

                        return (
                          <CommandItem
                            key={command.trigger}
                            value={command.trigger}
                            onSelect={() => onSelect(command)}
                            className={`cursor-pointer ${
                              globalIndex === selectedIndex ? 'bg-accent' : ''
                            }`}
                            data-selected={globalIndex === selectedIndex}
                          >
                            <div className="flex items-start gap-3 w-full">
                              <div className="mt-0.5 text-muted-foreground">
                                {command.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium">
                                    /{command.trigger}
                                  </span>
                                  {command.shortcut && (
                                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                      {command.shortcut}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {command.description}
                                </p>
                              </div>
                            </div>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                    {catIndex < categories.length - 1 && <CommandSeparator />}
                  </div>
                ))}
              </>
            )}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

export function getFilteredEnhancedCommands(searchQuery: string): SlashCommand[] {
  return enhancedSlashCommands.filter((cmd) => 
    cmd.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

/**
 * Parse slash command with parameters
 * Examples:
 *  /turno -> { command: 'turno', params: {} }
 *  /turno cardiología -> { command: 'turno', params: { specialty: 'cardiología' } }
 *  /turno cardiología 15:30 presencial -> { command: 'turno', params: { specialty: 'cardiología', time: '15:30', modality: 'presencial' } }
 *  /nota Paciente reporta dolor -> { command: 'nota', params: { text: 'Paciente reporta dolor' } }
 */
export function parseSlashCommand(input: string): {
  command: string;
  params: Record<string, string>;
  rawParams: string;
} {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/);
  const command = parts[0].replace('/', '');
  const rawParams = parts.slice(1).join(' ');
  const params: Record<string, string> = {};

  if (command === 'turno' && rawParams) {
    // Parse turno parameters
    const paramParts = rawParams.split(/\s+/);
    
    // Look for time (HH:MM format)
    const timeMatch = rawParams.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      params.time = timeMatch[0];
    }

    // Look for modality
    if (rawParams.includes('presencial')) {
      params.modality = 'presencial';
    } else if (rawParams.includes('virtual')) {
      params.modality = 'virtual';
    }

    // Everything else is likely the specialty (first continuous text)
    const specialty = paramParts.filter(p => !p.match(/\d{1,2}:\d{2}/) && p !== 'presencial' && p !== 'virtual').join(' ');
    if (specialty) {
      params.specialty = specialty;
    }
  } else if (command === 'nota' && rawParams) {
    // For notes, everything after /nota is the note text
    params.text = rawParams;
  }

  return { command, params, rawParams };
}
