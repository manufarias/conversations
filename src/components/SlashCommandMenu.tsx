import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { MessageSquare, Key, FileText, Heart, Phone, CheckCircle2 } from "lucide-react";

export interface SlashCommand {
  name: string;
  trigger: string;
  description: string;
  text: string;
  icon: React.ReactNode;
  action?: "close_ticket"; // Special action for commands that perform actions instead of inserting text
}

export const slashCommands: SlashCommand[] = [
  {
    name: "Saludo",
    trigger: "saludo",
    description: "Mensaje de bienvenida estándar para nuevo chat",
    text: "Hola [Nombre del Paciente], veo que tiene un problema con [Asunto]. Mi nombre es [Nombre del Operador] y estaré encantado de ayudarle con eso.",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    name: "Restablecer Contraseña",
    trigger: "restablecer_contraseña",
    description: "Pasos para restablecer contraseña",
    text: "Puede restablecer su contraseña del portal del paciente visitando [enlace]. Por favor avíseme si tiene algún problema.",
    icon: <Key className="h-4 w-4" />,
  },
  {
    name: "Verificar Resultados",
    trigger: "verificar_resultados",
    description: "Cómo encontrar resultados",
    text: "Los resultados de las pruebas suelen estar disponibles en la sección 'Mis Resultados' de su perfil entre 3 y 5 días después de su visita al laboratorio. ¿Puede confirmar si ya lo revisó?",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "Empatía",
    trigger: "empatia",
    description: "Reconocer frustración",
    text: "Entiendo que esto debe ser frustrante para usted, y me disculpo por el inconveniente. Trabajemos para resolver esto.",
    icon: <Heart className="h-4 w-4" />,
  },
  {
    name: "Transferir a Facturación",
    trigger: "transferir",
    description: "Transferir al departamento de facturación",
    text: "Para este problema, necesitaré transferirle a nuestro departamento de facturación. ¿Le gustaría que lo hiciera ahora?",
    icon: <Phone className="h-4 w-4" />,
  },
  {
    name: "Cerrar Ticket",
    trigger: "cerrar",
    description: "Marcar esta conversación como resuelta y cerrar el ticket",
    text: "",
    icon: <CheckCircle2 className="h-4 w-4" />,
    action: "close_ticket",
  },
];

interface SlashCommandMenuProps {
  searchQuery: string;
  selectedIndex: number;
  onSelect: (command: SlashCommand) => void;
}

export function SlashCommandMenu({ searchQuery, selectedIndex, onSelect }: SlashCommandMenuProps) {
  const filteredCommands = slashCommands.filter((cmd) => 
    cmd.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 z-50">
      <div className="bg-popover border border-border rounded-md shadow-lg max-w-2xl mx-auto">
        <Command shouldFilter={false}>
          <CommandList>
            {filteredCommands.length === 0 ? (
              <CommandEmpty>No se encontraron comandos.</CommandEmpty>
            ) : (
              <CommandGroup heading="Acciones Rápidas">
                {filteredCommands.map((command, index) => (
                  <CommandItem
                    key={command.trigger}
                    value={command.trigger}
                    onSelect={() => onSelect(command)}
                    className="cursor-pointer"
                    data-selected={index === selectedIndex}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="mt-0.5">
                        {command.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">/{command.trigger}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {command.description}
                        </p>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

export function getFilteredCommands(searchQuery: string): SlashCommand[] {
  return slashCommands.filter((cmd) => 
    cmd.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
