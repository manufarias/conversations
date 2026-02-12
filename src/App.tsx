import { useState, useEffect } from "react";
import { LoginView } from "./components/LoginView";
import { OTPVerificationView } from "./components/OTPVerificationView";
import { LoadingView } from "./components/LoadingView";
import { ChatList, PatientConversation } from "./components/ChatList";
import { PatientTimeline, PatientTicket } from "./components/PatientTimeline";
import {
  PatientContextSidebar,
  PatientContextData,
} from "./components/PatientContextSidebar";
import { ChannelSelector, Channel } from "./components/ChannelSelector";
import {
  NotificationDropdown,
  Notification,
} from "./components/NotificationDropdown";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import svgPaths from "./imports/svg-hfi8ubk2ei";
import {
  Bell,
  Home,
  MessageSquare,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  ConversationContext,
  generateContextualReply,
  updateContext,
} from "./components/ConversationContext";

// Mock data - Lista de pacientes con su última actividad
const mockPatientList: PatientConversation[] = [
  {
    patientId: "1",
    patientName: "María González",
    lastMessage: "Tengo problemas para acceder a mis resultados de análisis",
    timestamp: "hace 2m",
    unread: true,
    unreadCount: 2,
    totalTickets: 3,
    channel: "whatsapp",
  },
  {
    patientId: "2",
    patientName: "Carlos Martínez",
    lastMessage: "¡Gracias por su ayuda!",
    timestamp: "hace 15m",
    unread: false,
    unreadCount: 0,
    totalTickets: 1,
    channel: "email",
  },
  {
    patientId: "3",
    patientName: "Sofía Rodríguez",
    lastMessage: "¿Puede ayudarme a programar una cita?",
    timestamp: "hace 5m",
    unread: true,
    unreadCount: 1,
    totalTickets: 1,
    channel: "whatsapp",
  },
  {
    patientId: "4",
    patientName: "Diego López",
    lastMessage: "Necesito actualizar mi información de seguro",
    timestamp: "hace 2h",
    unread: false,
    unreadCount: 0,
    totalTickets: 1,
    channel: "email",
  },
  {
    patientId: "5",
    patientName: "Laura Martínez",
    lastMessage: "¿Está disponible la Dra. Romero esta semana?",
    timestamp: "hace 3h",
    unread: false,
    unreadCount: 0,
    totalTickets: 1,
    channel: "whatsapp",
  },
];

// Mock patient context data
const mockPatientData: Record<string, PatientContextData> = {
  "1": {
    name: "María González",
    dob: "1985-03-15",
    mrn: "MRN-12345678",
    activeRequests: [
      {
        id: "auth_001",
        type: "Autorización",
        details: "Resonancia Magnética - Rodilla Izquierda",
        submittedDate: "2026-02-12",
        status: "Pendiente de Revisión",
        statusColor: "amber",
      },
      {
        id: "refill_001",
        type: "Resurtido de Prescripción",
        details: "Metformina 500mg",
        submittedDate: "2026-02-11",
        status: "Enviado a Farmacia",
        statusColor: "sky",
      },
    ],
    segments: [
      {
        id: "seg_001",
        name: "Programa de Monitoreo de Diabetes",
        description: "La paciente está activamente inscrita.",
      },
    ],
    recentActivity: {
      appointments: {
        upcoming: {
          date: "2026-02-20",
          provider: "Dra. Patricia Romero (Médico de Cabecera)",
        },
        past: {
          date: "2026-01-15",
          provider: "Dr. Fernando Morales (Cardiología)",
        },
      },
    },
    context: {
      pcp: "Dra. Patricia Romero, MD",
      familyAccess: [
        { name: "Roberto González", relation: "Esposo" },
        { name: "Leonardo González", relation: "Hijo" },
      ],
    },
  },
  "2": {
    name: "Carlos Martínez",
    dob: "1992-07-22",
    mrn: "MRN-23456789",
    activeRequests: [],
    segments: [
      {
        id: "seg_002",
        name: "Programa de Manejo de Asma",
        description: "El paciente está activamente inscrito.",
      },
    ],
    recentActivity: {
      appointments: {
        upcoming: {
          date: "2026-02-25",
          provider: "Dr. Luis Mendoza (Médico de Cabecera)",
        },
        past: {
          date: "2025-12-20",
          provider: "Dr. Luis Mendoza (Médico de Cabecera)",
        },
      },
    },
    context: {
      pcp: "Dr. Luis Mendoza, MD",
      familyAccess: [],
    },
  },
  "3": {
    name: "Sofía Rodríguez",
    dob: "1978-11-08",
    mrn: "MRN-34567890",
    activeRequests: [
      {
        id: "auth_002",
        type: "Autorización",
        details: "Consulta Neurológica",
        submittedDate: "2026-02-09",
        status: "Aprobado",
        statusColor: "emerald",
      },
    ],
    segments: [],
    recentActivity: {
      appointments: {
        upcoming: {
          date: "2026-02-18",
          provider: "Dra. Isabel Vargas (Médico de Cabecera)",
        },
      },
    },
    context: {
      pcp: "Dra. Isabel Vargas, MD",
      familyAccess: [{ name: "Carlos Rodríguez", relation: "Esposo" }],
    },
  },
  "4": {
    name: "Diego López",
    dob: "1965-01-30",
    mrn: "MRN-45678901",
    activeRequests: [
      {
        id: "refill_002",
        type: "Resurtido de Prescripción",
        details: "Atorvastatina 40mg",
        submittedDate: "2026-02-10",
        status: "Procesando",
        statusColor: "amber",
      },
    ],
    segments: [
      {
        id: "seg_003",
        name: "Programa de Cuidado Cardíaco",
        description: "El paciente está activamente inscrito.",
      },
    ],
    recentActivity: {
      appointments: {
        past: {
          date: "2026-01-30",
          provider: "Dr. Rafael Sánchez (Médico de Cabecera)",
        },
      },
    },
    context: {
      pcp: "Dr. Rafael Sánchez, MD",
      familyAccess: [],
    },
  },
  "5": {
    name: "Laura Martínez",
    dob: "1990-09-12",
    mrn: "MRN-56789012",
    activeRequests: [],
    segments: [],
    recentActivity: {
      appointments: {
        upcoming: {
          date: "2026-02-26",
          provider: "Dr. Miguel Torres (Médico de Cabecera)",
        },
      },
    },
    context: {
      pcp: "Dr. Miguel Torres, MD",
      familyAccess: [
        { name: "Juan Martínez", relation: "Esposo" },
        { name: "Sofía Martínez", relation: "Hija" },
      ],
    },
  },
};

// Mock patient tickets - Cada paciente puede tener múltiples conversaciones/tickets
const mockPatientTickets: Record<string, PatientTicket[]> = {
  "1": [
    // María González - 3 tickets (más reciente primero)
    {
      conversationId: "1-3",
      subject:
        "Problemas para acceder a resultados de análisis de sangre de la semana pasada",
      status: "Open",
      messages: [
        {
          id: "m1",
          text: "Hola, tengo problemas para acceder a mis resultados de análisis de sangre de la semana pasada.",
          timestamp: "10:42 AM",
          date: "2026-02-12",
          isOperator: false,
        },
        {
          id: "m2",
          text: "¡Hola María! Con gusto te ayudaré con eso. Déjame revisar tu cuenta.",
          timestamp: "10:43 AM",
          date: "2026-02-12",
          isOperator: true,
          status: "read" as const,
        },
        {
          id: "m3",
          text: "Puedo ver que tus resultados están disponibles. ¿Recibes algún mensaje de error cuando intentas acceder a ellos?",
          timestamp: "10:43 AM",
          date: "2026-02-12",
          isOperator: true,
          status: "read" as const,
        },
        {
          id: "m4",
          text: "Sí, dice 'acceso denegado' cuando hago clic en los resultados de laboratorio.",
          timestamp: "10:45 AM",
          date: "2026-02-12",
          isOperator: false,
        },
        {
          id: "sys1",
          text: "Paciente tiene historial de problemas técnicos similares. Verificar permisos de acceso en el sistema de laboratorio.",
          timestamp: "10:46 AM",
          date: "2026-02-12",
          isOperator: true,
          isSystemEvent: true,
          eventType: "internal_note",
        },
      ],
    },
    {
      conversationId: "1-2",
      subject: "Pregunta sobre resurtido de mi prescripción",
      status: "Resolved",
      closedDate: "29 de enero de 2026",
      messages: [
        {
          id: "m1",
          text: "Hola, necesito resurtir mi medicamento para diabetes pero el portal no me deja.",
          timestamp: "2:15 PM",
          date: "2026-01-28",
          isOperator: false,
        },
        {
          id: "m2",
          text: "¡Hola María! Déjame revisar el estado de tu prescripción.",
          timestamp: "2:17 PM",
          date: "2026-01-28",
          isOperator: true,
          status: "read" as const,
        },
        {
          id: "m3",
          text: "Veo el problema. Tu prescripción necesita renovación de la Dra. Romero. Les he enviado una solicitud.",
          timestamp: "2:20 PM",
          date: "2026-01-28",
          isOperator: true,
          status: "read" as const,
        },
        {
          id: "sys2",
          text: "Solicitud de renovación enviada al Dr. Romero vía sistema EHR. Ticket de seguimiento: RX-2847",
          timestamp: "2:21 PM",
          date: "2026-01-28",
          isOperator: true,
          isSystemEvent: true,
          eventType: "internal_note",
        },
        {
          id: "m4",
          text: "¿Cuánto tiempo tomará eso?",
          timestamp: "2:22 PM",
          date: "2026-01-28",
          isOperator: false,
        },
        {
          id: "m5",
          text: "Usualmente 24-48 horas. Recibirás una notificación cuando esté listo.",
          timestamp: "2:23 PM",
          date: "2026-01-28",
          isOperator: true,
          status: "read" as const,
        },
        {
          id: "m6",
          text: "¡Perfecto! Recibí la notificación. ¡Gracias!",
          timestamp: "11:30 AM",
          date: "2026-01-29",
          isOperator: false,
        },
        {
          id: "m7",
          text: "¡De nada! Me alegra que pudimos ayudar.",
          timestamp: "11:32 AM",
          date: "2026-01-29",
          isOperator: true,
          status: "read" as const,
        },
        {
          id: "sys3",
          text: "Estado cambiado",
          timestamp: "11:33 AM",
          date: "2026-01-29",
          isOperator: true,
          isSystemEvent: true,
          eventType: "status_change",
          metadata: {
            oldValue: "Pendiente",
            newValue: "Resuelto",
          },
        },
      ],
    },
    {
      conversationId: "1-1",
      subject: "No puedo programar cita en línea",
      status: "Resolved",
      closedDate: "15 de diciembre de 2025",
      messages: [
        {
          id: "m1",
          text: "El sistema de programación no muestra citas disponibles con la Dra. Romero.",
          timestamp: "9:20 AM",
          date: "2025-12-14",
          isOperator: false,
        },
        {
          id: "m2",
          text: "¡Hola María! Puedo ayudarte a programar eso. ¿Qué tipo de cita necesitas?",
          timestamp: "9:22 AM",
          date: "2025-12-14",
          isOperator: true,
          status: "read" as const,
        },
        {
          id: "m3",
          text: "Solo un chequeo de rutina para el manejo de mi diabetes.",
          timestamp: "9:25 AM",
          date: "2025-12-14",
          isOperator: false,
        },
        {
          id: "m4",
          text: "Te he programado para el 22 de diciembre a las 10:00 AM. Recibirás un correo de confirmación pronto.",
          timestamp: "9:28 AM",
          date: "2025-12-14",
          isOperator: true,
          status: "read" as const,
        },
        {
          id: "m5",
          text: "¡Genial, muchas gracias!",
          timestamp: "3:15 PM",
          date: "2025-12-15",
          isOperator: false,
        },
      ],
    },
  ],
  "2": [
    {
      conversationId: "2-1",
      subject: "Ayuda para restablecer contraseña del portal",
      status: "Resolved",
      closedDate: "7 de febrero de 2026",
      messages: [
        {
          id: "m1",
          text: "Necesitaba ayuda para restablecer mi contraseña del portal",
          timestamp: "10:15 AM",
          date: "2026-02-06",
          isOperator: false,
        },
        {
          id: "m2",
          text: "He enviado un enlace para restablecer la contraseña a tu dirección de correo registrada. Por favor revisa tu bandeja de entrada y carpeta de spam.",
          timestamp: "10:16 AM",
          date: "2026-02-06",
          isOperator: true,
          status: "read" as const,
        },
        {
          id: "m3",
          text: "¡Lo tengo! Funcionó perfectamente.",
          timestamp: "10:20 AM",
          date: "2026-02-07",
          isOperator: false,
        },
        {
          id: "m4",
          text: "¡Gracias por tu ayuda!",
          timestamp: "10:20 AM",
          date: "2026-02-07",
          isOperator: false,
        },
      ],
    },
  ],
  "3": [
    {
      conversationId: "3-1",
      subject: "Ayuda para programar una cita",
      status: "New",
      messages: [
        {
          id: "m1",
          text: "¿Puede ayudarme a programar una cita?",
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
          date: (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; })(),
          isOperator: false,
        },
      ],
    },
  ],
  "4": [
    {
      conversationId: "4-1",
      subject: "Actualizar información de seguro",
      status: "Pending",
      messages: [
        {
          id: "m1",
          text: "Necesito actualizar mi información de seguro",
          timestamp: "8:45 AM",
          date: "2026-02-12",
          isOperator: false,
        },
      ],
    },
  ],
  "5": [
    {
      conversationId: "5-1",
      subject: "Disponibilidad del Dr. Smith esta semana",
      status: "Open",
      messages: [
        {
          id: "m1",
          text: "¿Está disponible el Dr. Smith esta semana?",
          timestamp: "7:30 AM",
          date: "2026-02-12",
          isOperator: false,
        },
      ],
    },
  ],
};

// Sidebar Component
function Sidebar({
  isCollapsed,
  onToggle,
}: {
  isCollapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`h-screen bg-white border-r border-[#e0e1e9] flex flex-col justify-between py-6 transition-all duration-300 ease-in-out relative flex-shrink-0 ${
        isCollapsed ? "w-[60px]" : "w-[216px]"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 z-50 w-6 h-6 bg-white border border-[#e0e1e9] rounded-full flex items-center justify-center shadow-md hover:bg-[#f8f8f8] hover:shadow-lg transition-all duration-200"
        aria-label={
          isCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"
        }
      >
        <div className="transition-transform duration-300">
          {isCollapsed ? (
            <ChevronRight
              className="h-3.5 w-3.5"
              style={{ stroke: "#6B6F93", strokeWidth: 2.5 }}
            />
          ) : (
            <ChevronLeft
              className="h-3.5 w-3.5"
              style={{ stroke: "#6B6F93", strokeWidth: 2.5 }}
            />
          )}
        </div>
      </button>

      {/* Header Section */}
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <div
          className={`px-6 overflow-hidden transition-all duration-300 ${isCollapsed ? "opacity-0 h-0" : "opacity-100 h-12"}`}
        >
          <div className="h-12 relative">
            <svg
              className="block h-full w-auto"
              fill="none"
              viewBox="0 0 158 48"
            >
              <g>
                <path d={svgPaths.p2747d300} fill="#1A66FC" />
                <g>
                  <path d={svgPaths.p6376fb0} fill="#1A66FC" />
                  <path d={svgPaths.p1523fc80} fill="#1A66FC" />
                  <path d={svgPaths.p31f6d680} fill="#1A66FC" />
                  <path d={svgPaths.p3f281c70} fill="#1A66FC" />
                  <path d={svgPaths.pe6f700} fill="#1A66FC" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-4">
          {/* Inicio */}
          {isCollapsed ? (
            <div className="flex justify-center">
              <button
                className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-[#f8f8f8] transition-colors"
                aria-label="Inicio"
              >
                <Home
                  className="h-6 w-6"
                  style={{ stroke: "#6B6F93", strokeWidth: 2 }}
                />
              </button>
            </div>
          ) : (
            <div className="pl-9 pr-6">
              <button className="flex items-center gap-2 px-3 py-2 rounded-tr-full rounded-br-full w-full text-left hover:bg-[#f8f8f8] transition-colors">
                <Home
                  className="h-6 w-6"
                  style={{ stroke: "#6B6F93", strokeWidth: 2 }}
                />
                <span className="text-[#6b6f93] whitespace-nowrap">Inicio</span>
              </button>
            </div>
          )}

          {/* Conversations - Active */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1a66fc] rounded-tr-lg rounded-br-lg" />
            {isCollapsed ? (
              <div className="flex justify-center">
                <div className="w-11 h-11 rounded-lg bg-[#e8f0ff] flex items-center justify-center">
                  <MessageSquare
                    className="h-6 w-6"
                    style={{ stroke: "#1A66FC", strokeWidth: 2, fill: "none" }}
                  />
                </div>
              </div>
            ) : (
              <div className="pl-9 pr-6">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#e8f0ff] rounded-tr-lg rounded-br-lg">
                  <MessageSquare
                    className="h-6 w-6"
                    style={{ stroke: "#1A66FC", strokeWidth: 2, fill: "none" }}
                  />
                  <span className="text-[#1a66fc] font-[700] whitespace-nowrap">
                    Conversations
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col gap-6">
        {/* Divider */}
        {!isCollapsed && (
          <div className="px-6">
            <div className="h-px bg-[#e0e1e9]" />
          </div>
        )}

        {/* Footer Items */}
        <div className="flex flex-col gap-4">
          {/* Ayuda */}
          {isCollapsed ? (
            <div className="flex justify-center">
              <button
                className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-[#f8f8f8] transition-colors"
                aria-label="Ayuda"
              >
                <HelpCircle
                  className="h-6 w-6"
                  style={{ stroke: "#6B6F93", strokeWidth: 1.5 }}
                />
              </button>
            </div>
          ) : (
            <div className="pl-9 pr-6">
              <button className="flex items-center gap-2 px-3 py-2 rounded-tr-full rounded-br-full w-full text-left hover:bg-[#f8f8f8] transition-colors">
                <HelpCircle
                  className="h-6 w-6"
                  style={{ stroke: "#6B6F93", strokeWidth: 1.5 }}
                />
                <span className="text-[#6b6f93] whitespace-nowrap">Ayuda</span>
              </button>
            </div>
          )}

          {/* Salir */}
          {isCollapsed ? (
            <div className="flex justify-center">
              <button
                className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-[#f8f8f8] transition-colors"
                aria-label="Salir"
              >
                <LogOut
                  className="h-6 w-6"
                  style={{ stroke: "#6B6F93", strokeWidth: 2 }}
                />
              </button>
            </div>
          ) : (
            <div className="pl-9 pr-6">
              <button className="flex items-center gap-2 px-3 py-2 rounded-tr-full rounded-br-full w-full text-left hover:bg-[#f8f8f8] transition-colors">
                <LogOut
                  className="h-6 w-6"
                  style={{ stroke: "#6B6F93", strokeWidth: 2 }}
                />
                <span className="text-[#6b6f93] whitespace-nowrap">Salir</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Header Component
function Header({
  notifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onNotificationClick,
}: {
  notifications: Notification[];
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsAsRead: () => void;
  onNotificationClick: (patientId: string) => void;
}) {
  return (
    <div className="h-[80px] bg-white border-b border-[#e0e1e9] px-6 md:px-10 lg:px-16 flex items-center justify-between flex-shrink-0">
      {/* Page Title */}
      <div className="min-w-0">
        <h1 className="text-[#40435b] font-[700] text-[20px] md:text-[24px] leading-[28px] truncate">
          Conversations
        </h1>
      </div>

      {/* Access Section */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        {/* Notification Bell */}
        <NotificationDropdown
          notifications={notifications}
          onMarkAsRead={onMarkNotificationAsRead}
          onMarkAllAsRead={onMarkAllNotificationsAsRead}
          onNotificationClick={onNotificationClick}
        />

        {/* User Badge */}
        <div className="flex items-center gap-2 bg-white border border-[#e0e1e9] rounded-lg px-3 py-2">
          <span className="text-[#40435b] text-[14px] hidden sm:inline">
            López, Marcos
          </span>
          <div className="h-6 w-6 rounded-full bg-[#e8f0ff] flex items-center justify-center flex-shrink-0">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.pcfc7580} fill="#1A66FC" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: "n1",
    patientId: "1",
    patientName: "María González",
    message: "Tengo problemas para acceder a mis resultados de análisis",
    timestamp: "hace 2m",
    isRead: false,
  },
  {
    id: "n2",
    patientId: "2",
    patientName: "Carlos Rodríguez",
    message: "Necesito renovar mi receta médica para la presión arterial",
    timestamp: "hace 15m",
    isRead: false,
  },
  {
    id: "n3",
    patientId: "3",
    patientName: "Ana Martínez",
    message: "¿Cuándo estará disponible el resultado de mi resonancia?",
    timestamp: "hace 1h",
    isRead: true,
  },
  {
    id: "n4",
    patientId: "4",
    patientName: "Roberto López",
    message: "Gracias por la atención, ya pude agendar mi cita",
    timestamp: "hace 2h",
    isRead: true,
  },
];

export default function App() {
  // Auth flow state
  const [authScreen, setAuthScreen] = useState<"login" | "otp" | "loading" | "app">(
    "login",
  );
  const [loginEmail, setLoginEmail] = useState("");

  const [patientList, setPatientList] = useState(mockPatientList);
  const [activePatientId, setActivePatientId] = useState<string | null>("1");
  const [patientTickets, setPatientTickets] = useState(mockPatientTickets);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatListCollapsed, setIsChatListCollapsed] = useState(false);
  const [isNavSidebarCollapsed, setIsNavSidebarCollapsed] = useState(false);
  const [fadingOutPatientId, setFadingOutPatientId] = useState<string | null>(
    null,
  );
  const [activeChannel, setActiveChannel] = useState<Channel>("whatsapp");
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [typingIndicators, setTypingIndicators] = useState<
    Record<string, boolean>
  >({});
  const [notifiedMessageIds, setNotifiedMessageIds] = useState<Set<string>>(
    new Set(),
  );

  // New state for enhanced features
  const [pinnedConversations, setPinnedConversations] = useState<Set<string>>(
    new Set(),
  );
  const [mutedConversations, setMutedConversations] = useState<Set<string>>(
    new Set(),
  );
  const [conversationContexts, setConversationContexts] = useState<
    Record<string, any>
  >({});
  const [internalNotes, setInternalNotes] = useState<Record<string, any[]>>({});

  // Track Sofia's scripted conversation step
  const [sofiaConversationStep, setSofiaConversationStep] = useState(0);

  // Auto-collapse nav sidebar when profile opens
  useEffect(() => {
    if (isProfileOpen) {
      setIsNavSidebarCollapsed(true);
    }
  }, [isProfileOpen]);

  // Responsive behavior: Auto-collapse sidebars on smaller screens
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // On screens smaller than 1280px, auto-collapse nav sidebar
      if (width < 1280) {
        setIsNavSidebarCollapsed(true);
      }

      // On screens smaller than 1024px, also collapse chat list
      if (width < 1024) {
        setIsChatListCollapsed(true);
      }
    };

    // Run on mount
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter to only show patients with active conversations (not all resolved)
  // Also filter by active channel and sort pinned to top
  const activePatientList = patientList
    .filter((patient) => {
      const tickets = patientTickets[patient.patientId] || [];
      const hasActiveTickets = tickets.some(
        (ticket) => ticket.status !== "Resolved",
      );
      const matchesChannel = patient.channel === activeChannel;
      return hasActiveTickets && matchesChannel;
    })
    .map((patient) => ({
      ...patient,
      isPinned: pinnedConversations.has(patient.patientId),
    }))
    .sort((a, b) => {
      // Pinned conversations always come first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const activePatient = activePatientList.find(
    (p) => p.patientId === activePatientId,
  );
  const activeTickets = activePatientId
    ? patientTickets[activePatientId] || []
    : [];
  const activePatientData = activePatientId
    ? mockPatientData[activePatientId]
    : null;

  const handleSelectPatient = (patientId: string) => {
    setActivePatientId(patientId);
    setIsProfileOpen(false);

    // Mark patient as read when selected (reset unread count)
    setPatientList((prev) =>
      prev.map((patient) =>
        patient.patientId === patientId
          ? { ...patient, unread: false, unreadCount: 0 }
          : patient,
      ),
    );

    // Mark all notifications for this patient as read
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.patientId === patientId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
    // Auto-collapse nav sidebar when profile opens
    setIsNavSidebarCollapsed(true);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const handleNotificationClick = (patientId: string) => {
    // Navigate to the patient's chat
    setActivePatientId(patientId);
    setIsProfileOpen(false);

    // Mark patient as read when selected
    setPatientList((prev) =>
      prev.map((patient) =>
        patient.patientId === patientId
          ? { ...patient, unread: false, unreadCount: 0 }
          : patient,
      ),
    );

    // Mark all notifications for this patient as read
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.patientId === patientId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  // Play notification sound
  const playNotificationSound = () => {
    // Check if sound is enabled
    const soundEnabled = (window as any).notificationSoundEnabled ?? true;
    if (!soundEnabled) return;

    // Create and play a simple notification beep using Web Audio API
    try {
      const audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a pleasant notification sound (two-tone beep)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn("Could not play notification sound:", error);
    }
  };

  // Simulate receiving new notifications periodically (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPatients = [
        {
          id: "5",
          name: "Lucía Fernández",
          message: "Buenos días, quisiera consultar sobre mis exámenes",
        },
        {
          id: "6",
          name: "Diego Morales",
          message: "Necesito una receta para continuar mi tratamiento",
        },
        {
          id: "7",
          name: "Sofía Ramírez",
          message: "¿Puedo agendar una cita para la próxima semana?",
        },
      ];

      // Randomly decide if we should add a notification (30% chance every 30 seconds)
      if (Math.random() < 0.3) {
        const randomPatient =
          randomPatients[Math.floor(Math.random() * randomPatients.length)];
        const newNotification: Notification = {
          id: `n-${Date.now()}`,
          patientId: randomPatient.id,
          patientName: randomPatient.name,
          message: randomPatient.message,
          timestamp: "Justo ahora",
          isRead: false,
        };

        setNotifications((prev) => [newNotification, ...prev]);
        playNotificationSound();

        // Show toast notification
        toast.info(`Nuevo mensaje de ${randomPatient.name}`);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Helper function to generate contextual patient responses
  const generatePatientResponse = (
    operatorMessage: string,
    patientId: string,
  ): string | null => {
    const lowerMessage = operatorMessage.toLowerCase();

    // Get or initialize conversation context for this patient
    const currentContext = conversationContexts[patientId] || {};

    // Update context with entities from operator message
    const updatedContext = updateContext(currentContext, operatorMessage);
    setConversationContexts((prev) => ({
      ...prev,
      [patientId]: updatedContext,
    }));

    // ===== SOFÍA RODRÍGUEZ (patientId "3") - Scripted sequential flow =====
    if (patientId === "3") {
      const step = sofiaConversationStep;

      // Step 0: Operator greets or offers help
      if (
        step === 0 &&
        (lowerMessage.includes("hola") ||
          lowerMessage.includes("buenos") ||
          lowerMessage.includes("buen") ||
          lowerMessage.includes("ayud") ||
          lowerMessage.includes("en qué puedo") ||
          lowerMessage.includes("necesit"))
      ) {
        setSofiaConversationStep(1);
        return "Hola, sí, necesito agendar una cita médica. ¿Me puede ayudar?";
      }

      // Step 1: Operator asks if the appointment is for her
      if (
        step === 1 &&
        (lowerMessage.includes("para quién") ||
          lowerMessage.includes("para quien") ||
          lowerMessage.includes("para vos") ||
          lowerMessage.includes("para usted") ||
          lowerMessage.includes("para ti") ||
          lowerMessage.includes("turno es para") ||
          lowerMessage.includes("cita es para") ||
          lowerMessage.includes("¿es para"))
      ) {
        setSofiaConversationStep(2);
        return "Sí, es para mí. Sofía Rodríguez, DNI 32.456.789.";
      }

      // Step 2: Operator asks about coverage/insurance
      if (
        step === 2 &&
        (lowerMessage.includes("cobertura") ||
          lowerMessage.includes("obra social") ||
          lowerMessage.includes("seguro") ||
          lowerMessage.includes("plan de salud") ||
          lowerMessage.includes("prepaga") ||
          lowerMessage.includes("mutual"))
      ) {
        setSofiaConversationStep(3);
        return "Tengo Plan Austral, el número de afiliado es 4521-8890.";
      }

      // Step 3: Operator asks about specialty
      if (
        step === 3 &&
        (lowerMessage.includes("especialidad") ||
          lowerMessage.includes("especialista") ||
          lowerMessage.includes("qué médico") ||
          lowerMessage.includes("qué doctor") ||
          lowerMessage.includes("tipo de consulta") ||
          lowerMessage.includes("motivo") ||
          lowerMessage.includes("qué turno") ||
          lowerMessage.includes("qué necesit"))
      ) {
        setSofiaConversationStep(4);
        return "Cardiología, por favor. Vengo con un control de rutina que me pidió mi médica de cabecera.";
      }

      // Step 4: Operator asks about schedule/time preference
      if (
        step === 4 &&
        (lowerMessage.includes("horario") ||
          lowerMessage.includes("fecha") ||
          lowerMessage.includes("cuándo") ||
          lowerMessage.includes("día") ||
          lowerMessage.includes("disponibilidad") ||
          lowerMessage.includes("hora") ||
          lowerMessage.includes("preferencia") ||
          lowerMessage.includes("mañana") ||
          lowerMessage.includes("tarde"))
      ) {
        setSofiaConversationStep(5);
        return "Prefiero por la mañana, entre 9 y 11. Si puede ser la semana que viene, lunes o martes me vendría perfecto.";
      }

      // Step 5: Operator asks about virtual or in-person
      if (
        step === 5 &&
        (lowerMessage.includes("presencial") ||
          lowerMessage.includes("virtual") ||
          lowerMessage.includes("teleconsulta") ||
          lowerMessage.includes("videollamada") ||
          lowerMessage.includes("modalidad") ||
          lowerMessage.includes("cómo prefer"))
      ) {
        setSofiaConversationStep(6);
        return "Presencial, por favor. La doctora me dijo que necesita hacerme unos estudios en el consultorio.";
      }

      // Step 6: Operator asks about copay
      if (
        step === 6 &&
        (lowerMessage.includes("copago") ||
          lowerMessage.includes("coseguro") ||
          lowerMessage.includes("costo") ||
          lowerMessage.includes("pago") ||
          lowerMessage.includes("abonar") ||
          lowerMessage.includes("valor") ||
          lowerMessage.includes("precio") ||
          lowerMessage.includes("cuánto"))
      ) {
        setSofiaConversationStep(7);
        return "Ah, ¿hay copago? ¿Cuánto sería? Con Plan Austral creo que tenía bonificación.";
      }

      // Step 7: Operator confirms copay/details
      if (
        step === 7 &&
        (lowerMessage.includes("$") ||
          lowerMessage.includes("pesos") ||
          lowerMessage.includes("bonific") ||
          lowerMessage.includes("sin cargo") ||
          lowerMessage.includes("copago") ||
          lowerMessage.includes("coseguro") ||
          lowerMessage.includes("costo"))
      ) {
        setSofiaConversationStep(8);
        return "Perfecto, me queda claro. ¿Me confirma entonces el turno?";
      }

      // Step 8: Operator confirms appointment
      if (
        step === 8 &&
        (lowerMessage.includes("confirm") ||
          lowerMessage.includes("agendado") ||
          lowerMessage.includes("reservado") ||
          lowerMessage.includes("programado") ||
          lowerMessage.includes("listo") ||
          lowerMessage.includes("✅"))
      ) {
        setSofiaConversationStep(9);
        return "¡Muchas gracias! ¿Me va a llegar una confirmación por WhatsApp o email?";
      }

      // Step 9: Operator confirms notification method
      if (step === 9) {
        setSofiaConversationStep(10);
        return "Perfecto, muchas gracias por la ayuda. ¡Que tenga buen día!";
      }

      // Step 10: Already finished
      if (
        step === 10 &&
        (lowerMessage.includes("algo más") ||
          lowerMessage.includes("otra cosa"))
      ) {
        return "No, eso sería todo. ¡Gracias nuevamente!";
      }

      // Fallback for Sofia - waiting
      if (
        lowerMessage.includes("momento") ||
        lowerMessage.includes("espera") ||
        lowerMessage.includes("verifico")
      ) {
        return "Dale, sin problema. Acá espero.";
      }

      return null;
    }

    // ===== OTHER PATIENTS - Original logic =====
    // Get previous messages for context
    const previousMessages = activeTickets
      .flatMap((ticket) => ticket.messages)
      .map((m) => ({ text: m.text, isOperator: m.isOperator }));

    // Try to generate contextual reply first
    const contextualReply = generateContextualReply(
      operatorMessage,
      updatedContext,
      patientId,
      previousMessages,
    );

    // If contextual reply is not generic, use it
    if (
      contextualReply &&
      !["Perfecto.", "Entendido.", "Sí, claro.", "De acuerdo."].includes(
        contextualReply,
      )
    ) {
      return contextualReply;
    }

    // Appointment confirmation response
    if (
      lowerMessage.includes("✅") ||
      lowerMessage.includes("cita confirmada") ||
      lowerMessage.includes("turno confirmado")
    ) {
      const responses = [
        "¡Perfecto! Muchas gracias.",
        "¡Excelente! Muchas gracias por la ayuda.",
        "¡Genial! Nos vemos entonces.",
        "Perfecto, ahí estaré. ¡Gracias!",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Appointment scheduled confirmation
    if (
      lowerMessage.includes("agendado") ||
      lowerMessage.includes("programado") ||
      lowerMessage.includes("reservado")
    ) {
      return "¡Perfecto! ¿Me llegará una confirmación por email?";
    }

    // Appointment type question
    if (
      lowerMessage.includes("tipo de cita") ||
      lowerMessage.includes("qué tipo") ||
      lowerMessage.includes("motivo de la consulta") ||
      lowerMessage.includes("motivo de consulta")
    ) {
      const responses = [
        "Necesito una consulta general, me gustaría revisar unos exámenes recientes.",
        "Es para un control de rutina.",
        "Tengo algunos síntomas que quisiera consultar con el médico.",
        "Necesito renovar una receta y hacer un chequeo.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Doctor/professional question
    if (
      lowerMessage.includes("qué doctor") ||
      lowerMessage.includes("con quién") ||
      lowerMessage.includes("qué médico") ||
      lowerMessage.includes("qué profesional") ||
      lowerMessage.includes("profesional")
    ) {
      const responses = [
        "Con mi médico de cabecera, por favor.",
        "¿Está disponible la Dra. Romero?",
        "El que tenga disponibilidad más pronto está bien.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Date/time question
    if (
      lowerMessage.includes("fecha") ||
      lowerMessage.includes("cuándo") ||
      lowerMessage.includes("hora") ||
      lowerMessage.includes("disponibilidad") ||
      lowerMessage.includes("día") ||
      lowerMessage.includes("qué día")
    ) {
      const responses = [
        "¿Tiene disponibilidad la próxima semana? Preferiblemente en la mañana.",
        "Cualquier día de la semana que viene me viene bien, en horario de mañana.",
        "Preferiría el lunes o martes si hay algo disponible.",
        "¿Hay algo para esta semana? Si no, la próxima está bien.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Time preference follow-up
    if (
      lowerMessage.includes("mañana o tarde") ||
      lowerMessage.includes("horario prefiere") ||
      lowerMessage.includes("qué horario")
    ) {
      return "Prefiero en la mañana, entre 9 y 12 si es posible.";
    }

    // Location question
    if (
      lowerMessage.includes("sede") ||
      lowerMessage.includes("dónde") ||
      lowerMessage.includes("ubicación") ||
      lowerMessage.includes("centro") ||
      lowerMessage.includes("qué sede")
    ) {
      return "La más cercana a mi domicilio, o la que tenga disponibilidad primero.";
    }

    // General appointment help confirmation
    if (
      lowerMessage.includes("claro") ||
      lowerMessage.includes("con gusto") ||
      lowerMessage.includes("ayudar") ||
      lowerMessage.includes("ayudo") ||
      lowerMessage.includes("puedo ayudar")
    ) {
      return "¡Gracias! Sí, necesito agendar una cita.";
    }

    // Greeting responses
    if (
      lowerMessage.includes("hola") ||
      lowerMessage.includes("buenos días") ||
      lowerMessage.includes("buenas tardes") ||
      lowerMessage.includes("buen día")
    ) {
      const responses = [
        "Hola, ¿cómo está?",
        "Buenos días!",
        "Hola, gracias por responder.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Information request
    if (
      lowerMessage.includes("qué necesita") ||
      lowerMessage.includes("en qué puedo") ||
      lowerMessage.includes("necesitas") ||
      lowerMessage.includes("en qué te puedo")
    ) {
      return "Necesito agendar una cita médica, ¿me puede ayudar?";
    }

    // Gratitude/closing
    if (
      lowerMessage.includes("de nada") ||
      lowerMessage.includes("para eso estamos") ||
      lowerMessage.includes("un placer")
    ) {
      return "¡Que tenga buen día!";
    }

    // Questions about the booking process
    if (
      lowerMessage.includes("paso a paso") ||
      lowerMessage.includes("necesito algunos datos") ||
      lowerMessage.includes("información") ||
      lowerMessage.includes("datos")
    ) {
      return "Sí, adelante.";
    }

    // Specialty question
    if (
      lowerMessage.includes("especialidad") ||
      lowerMessage.includes("qué especialista") ||
      lowerMessage.includes("especialista")
    ) {
      const responses = [
        "Consulta clínica médica.",
        "Necesito ver a un médico general.",
        "Cardiología, por favor.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Coverage/insurance question
    if (
      lowerMessage.includes("cobertura") ||
      lowerMessage.includes("obra social") ||
      lowerMessage.includes("seguro") ||
      lowerMessage.includes("plan de salud")
    ) {
      return "Tengo Plan Austral.";
    }

    // Confirmation questions
    if (
      lowerMessage.includes("confirma") ||
      lowerMessage.includes("está bien") ||
      lowerMessage.includes("te parece") ||
      lowerMessage.includes("de acuerdo")
    ) {
      return "Sí, perfecto.";
    }

    // Virtual vs in-person
    if (
      lowerMessage.includes("virtual") ||
      lowerMessage.includes("presencial") ||
      lowerMessage.includes("teleconsulta") ||
      lowerMessage.includes("videollamada")
    ) {
      return "Prefiero presencial si es posible.";
    }

    // Understanding/acknowledgment
    if (
      lowerMessage.includes("entiendo") ||
      lowerMessage.includes("comprendo") ||
      lowerMessage.includes("veo")
    ) {
      return "Gracias.";
    }

    // Follow-up questions
    if (
      lowerMessage.includes("algo más") ||
      lowerMessage.includes("otra cosa") ||
      lowerMessage.includes("más información")
    ) {
      return "No, eso sería todo por ahora.";
    }

    // Thanks from operator
    if (
      lowerMessage.includes("gracias por") ||
      lowerMessage.includes("agradezco")
    ) {
      return "¡De nada!";
    }

    // Reason elaboration
    if (
      lowerMessage.includes("cuéntame más") ||
      lowerMessage.includes("explique") ||
      lowerMessage.includes("detalle")
    ) {
      return "Es que he estado sintiendo un poco de malestar y quiero que me revisen.";
    }

    // Urgency questions
    if (
      lowerMessage.includes("urgente") ||
      lowerMessage.includes("emergencia") ||
      lowerMessage.includes("prioridad")
    ) {
      return "No es urgente, puede ser en los próximos días.";
    }

    // Previous appointments
    if (
      lowerMessage.includes("última vez") ||
      lowerMessage.includes("anterior") ||
      lowerMessage.includes("antes")
    ) {
      return "Hace unos meses, en junio creo.";
    }

    // Contact preference
    if (
      lowerMessage.includes("contacto") ||
      lowerMessage.includes("teléfono") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("correo")
    ) {
      return "Por favor por WhatsApp o email, como le sea más fácil.";
    }

    // Waiting for something
    if (
      lowerMessage.includes("momento") ||
      lowerMessage.includes("espera") ||
      lowerMessage.includes("verifico")
    ) {
      return "Claro, sin problema.";
    }

    // Generic yes/no questions - contextual
    if (
      lowerMessage.includes("?") &&
      (lowerMessage.includes("puede") ||
        lowerMessage.includes("podría") ||
        lowerMessage.includes("sería"))
    ) {
      return "Sí, claro.";
    }

    return null;
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    if (!activePatientId) return;

    const now = new Date();
    const newMessage = {
      id: `m${Date.now()}`,
      text,
      timestamp: now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      date: now.toISOString().split("T")[0],
      isOperator: true,
      status: "pending" as const,
    };

    // Add message to the specific conversation
    setPatientTickets((prev) => ({
      ...prev,
      [activePatientId]: prev[activePatientId].map((ticket) =>
        ticket.conversationId === conversationId
          ? { ...ticket, messages: [...ticket.messages, newMessage] }
          : ticket,
      ),
    }));

    // Update patient list with latest message and mark as read (unread count becomes 0)
    setPatientList((prev) =>
      prev.map((patient) =>
        patient.patientId === activePatientId
          ? {
              ...patient,
              lastMessage: text,
              timestamp: "Justo ahora",
              unread: false,
              unreadCount: 0,
            }
          : patient,
      ),
    );

    // Check if we should generate an auto-response (for appointment booking flow)
    const patientResponse = generatePatientResponse(text, activePatientId);
    if (patientResponse) {
      // Show typing indicator
      setTypingIndicators((prev) => ({ ...prev, [activePatientId]: true }));

      // Generate patient response after a realistic variable delay (1-3 seconds based on message length)
      const baseDelay = 1000;
      const lengthDelay = Math.min(patientResponse.length * 20, 2000); // Up to 2 extra seconds
      const randomDelay = Math.random() * 500; // Add 0-500ms randomness
      const totalDelay = baseDelay + lengthDelay + randomDelay;

      setTimeout(() => {
        // Remove typing indicator
        setTypingIndicators((prev) => ({ ...prev, [activePatientId]: false }));

        const responseTime = new Date();
        const autoResponseId = `m${Date.now()}`;
        const autoResponse = {
          id: autoResponseId,
          text: patientResponse,
          timestamp: responseTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          date: responseTime.toISOString().split("T")[0],
          isOperator: false,
        };

        // Add patient's auto-response
        setPatientTickets((prev) => ({
          ...prev,
          [activePatientId]: prev[activePatientId].map((ticket) =>
            ticket.conversationId === conversationId
              ? { ...ticket, messages: [...ticket.messages, autoResponse] }
              : ticket,
          ),
        }));

        // Update patient list with the auto-response
        const patientInfo = patientList.find(
          (p) => p.patientId === activePatientId,
        );
        setPatientList((prev) =>
          prev.map((patient) =>
            patient.patientId === activePatientId
              ? {
                  ...patient,
                  lastMessage: patientResponse,
                  timestamp: "Justo ahora",
                  unread: false,
                  unreadCount: 0,
                }
              : patient,
          ),
        );

        // Only create notification if message hasn't been notified before
        if (patientInfo && !notifiedMessageIds.has(autoResponseId)) {
          const newNotification: Notification = {
            id: `n-${Date.now()}`,
            patientId: activePatientId,
            patientName: patientInfo.patientName,
            message: patientResponse,
            timestamp: "Justo ahora",
            isRead: false,
          };

          setNotifications((prev) => [newNotification, ...prev]);
          setNotifiedMessageIds((prev) => new Set(prev).add(autoResponseId));
          playNotificationSound();
        }
      }, totalDelay);
    }
  };

  const handleStatusChange = (
    conversationId: string,
    status: "New" | "Open" | "Pending" | "Resolved",
  ) => {
    if (!activePatientId) return;

    const closedDate =
      status === "Resolved"
        ? new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : undefined;

    const currentPatientId = activePatientId;
    const currentPatientName = activePatient?.patientName || "Patient";

    const now = new Date();
    const statusLabels: Record<string, string> = {
      New: "Nuevo",
      Open: "Abierto",
      Pending: "Pendiente",
      Resolved: "Resuelto",
    };

    // If changing to Resolved, orchestrate the sequential flow
    if (status === "Resolved") {
      // STEP 1: Update ticket status (PatientTimeline will handle its own closing animation - 1000ms)
      setPatientTickets((prev) => ({
        ...prev,
        [currentPatientId]: prev[currentPatientId].map((ticket) => {
          if (ticket.conversationId === conversationId) {
            const oldStatus = ticket.status;

            // Create system event for status change
            const systemEvent = {
              id: `sys${Date.now()}`,
              text: `Estado cambiado`,
              timestamp: now.toLocaleTimeString("es-ES", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }),
              date: now.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }),
              isOperator: true,
              isSystemEvent: true,
              eventType: "status_change" as const,
              metadata: {
                oldValue: statusLabels[oldStatus],
                newValue: statusLabels[status],
              },
            };

            return {
              ...ticket,
              status,
              closedDate,
              messages: [...ticket.messages, systemEvent],
            };
          }
          return ticket;
        }),
      }));

      // STEP 2: Show toast immediately (displays for 3000ms)
      toast.success(`Conversación cerrada con ${currentPatientName}`);

      // STEP 3: Wait 3000ms (when toast finishes), then show empty state
      setTimeout(() => {
        setActivePatientId(null); // Clear active patient to show empty state
      }, 3000);

      // STEP 4: Wait 4500ms (1500ms after toast finishes), then trigger patient fade-out from chat list
      setTimeout(() => {
        setFadingOutPatientId(currentPatientId);
      }, 4500);

      // STEP 5: Wait 6500ms total (2000ms after fade starts), then clean up
      setTimeout(() => {
        setFadingOutPatientId(null);
      }, 6500);
    } else {
      // No fade-out needed, update immediately
      setPatientTickets((prev) => ({
        ...prev,
        [activePatientId]: prev[activePatientId].map((ticket) => {
          if (ticket.conversationId === conversationId) {
            const oldStatus = ticket.status;

            // Create system event for status change
            const systemEvent = {
              id: `sys${Date.now()}`,
              text: `Estado cambiado`,
              timestamp: now.toLocaleTimeString("es-ES", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }),
              date: now.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }),
              isOperator: true,
              isSystemEvent: true,
              eventType: "status_change" as const,
              metadata: {
                oldValue: statusLabels[oldStatus],
                newValue: statusLabels[status],
              },
            };

            return {
              ...ticket,
              status,
              closedDate,
              messages: [...ticket.messages, systemEvent],
            };
          }
          return ticket;
        }),
      }));
    }
  };

  const handleSubjectChange = (conversationId: string, newSubject: string) => {
    if (!activePatientId) return;

    const now = new Date();

    setPatientTickets((prev) => ({
      ...prev,
      [activePatientId]: prev[activePatientId].map((ticket) => {
        if (ticket.conversationId === conversationId) {
          const oldSubject = ticket.subject;

          // Create system event for subject change
          const systemEvent = {
            id: `sys${Date.now()}`,
            text: `Asunto actualizado`,
            timestamp: now.toLocaleTimeString("es-ES", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
            date: now.toLocaleDateString("es-ES", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
            isOperator: true,
            isSystemEvent: true,
            eventType: "subject_change" as const,
            metadata: {
              oldValue: oldSubject,
              newValue: newSubject,
            },
          };

          return {
            ...ticket,
            subject: newSubject,
            messages: [...ticket.messages, systemEvent],
          };
        }
        return ticket;
      }),
    }));
  };

  // Pin/Unpin conversation handler
  const handleTogglePin = (patientId: string) => {
    setPinnedConversations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(patientId)) {
        newSet.delete(patientId);
        toast.success("Conversación desfijada");
      } else {
        newSet.add(patientId);
        toast.success("Conversación fijada");
      }
      return newSet;
    });
  };

  // Mute/Unmute conversation handler
  const handleToggleMute = (patientId: string) => {
    setMutedConversations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(patientId)) {
        newSet.delete(patientId);
        toast.success("Notificaciones activadas");
      } else {
        newSet.add(patientId);
        toast.success("Conversación silenciada");
      }
      return newSet;
    });
  };

  // Create internal note handler
  const handleCreateNote = (patientId: string, text: string) => {
    const now = new Date();
    const newNote = {
      id: `note${Date.now()}`,
      text,
      author: "Marcos López",
      timestamp: now.toLocaleTimeString("es-ES", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setInternalNotes((prev) => ({
      ...prev,
      [patientId]: [...(prev[patientId] || []), newNote],
    }));

    toast.success("Nota interna guardada");
  };

  const handleSimulateNewMessage = (conversationId: string) => {
    if (!activePatientId) return;

    const now = new Date();
    const newMessage = {
      id: `m${Date.now()}`,
      text: "¡Hola! Acabo de revisar y sigo teniendo el mismo problema. ¿Puede ayudarme?",
      timestamp: now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      date: now.toISOString().split("T")[0],
      isOperator: false,
    };

    // Add simulated patient message to the conversation
    setPatientTickets((prev) => ({
      ...prev,
      [activePatientId]: prev[activePatientId].map((ticket) =>
        ticket.conversationId === conversationId
          ? { ...ticket, messages: [...ticket.messages, newMessage] }
          : ticket,
      ),
    }));

    // Update patient list with latest message and mark as unread (increment unread count)
    const patientInfo = patientList.find(
      (p) => p.patientId === activePatientId,
    );
    setPatientList((prev) =>
      prev.map((patient) =>
        patient.patientId === activePatientId
          ? {
              ...patient,
              lastMessage: newMessage.text,
              timestamp: "Justo ahora",
              unread: true,
              unreadCount: patient.unreadCount + 1,
            }
          : patient,
      ),
    );

    // Create notification for operator
    if (patientInfo) {
      const notification: Notification = {
        id: `n-${Date.now()}`,
        patientId: activePatientId,
        patientName: patientInfo.patientName,
        message: newMessage.text,
        timestamp: "Justo ahora",
        isRead: false,
      };

      setNotifications((prev) => [notification, ...prev]);
      playNotificationSound();
    }
  };

  // Auth screens
  if (authScreen === "login") {
    return (
      <LoginView
        onLogin={(email) => {
          setLoginEmail(email);
          setAuthScreen("otp");
        }}
      />
    );
  }

  if (authScreen === "otp") {
    return (
      <OTPVerificationView
        email={loginEmail}
        onVerify={() => setAuthScreen("loading")}
        onBack={() => setAuthScreen("login")}
      />
    );
  }

  if (authScreen === "loading") {
    return <LoadingView onComplete={() => setAuthScreen("app")} />;
  }

  return (
    <div className="size-full flex bg-[#f8f8f8] overflow-hidden">
      {/* Left Sidebar Navigation */}
      <Sidebar
        isCollapsed={isNavSidebarCollapsed}
        onToggle={() => setIsNavSidebarCollapsed(!isNavSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          notifications={notifications}
          onMarkNotificationAsRead={handleMarkNotificationAsRead}
          onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
          onNotificationClick={handleNotificationClick}
        />

        {/* Content - 4 Column Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Channel Selector */}
          <ChannelSelector
            activeChannel={activeChannel}
            onChannelChange={setActiveChannel}
          />

          {/* Left Panel - Patient List */}
          <div
            className={`h-full transition-all duration-300 ease-in-out flex-shrink-0 ${
              isChatListCollapsed ? "w-[60px]" : "w-80"
            }`}
          >
            <ChatList
              patients={activePatientList}
              activePatientId={activePatientId}
              onSelectPatient={handleSelectPatient}
              isCollapsed={isChatListCollapsed}
              onToggleCollapse={() =>
                setIsChatListCollapsed(!isChatListCollapsed)
              }
              fadingOutPatientId={fadingOutPatientId}
            />
          </div>

          {/* Center Panel - Patient Timeline */}
          <div className="flex-1 h-full shadow-[-4px_0_12px_rgba(0,0,0,0.08)] min-w-0">
            {activePatient ? (
              <PatientTimeline
                key={activePatientId}
                patientName={activePatient.patientName}
                primaryCarePhysician={activePatientData?.context.pcp}
                tickets={activeTickets}
                onSendMessage={handleSendMessage}
                onOpenProfile={handleOpenProfile}
                onStatusChange={handleStatusChange}
                onSimulateNewMessage={handleSimulateNewMessage}
                onSubjectChange={handleSubjectChange}
                isTyping={
                  activePatientId
                    ? typingIndicators[activePatientId] || false
                    : false
                }
              />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground bg-white">
                Selecciona un paciente para ver su línea de tiempo de
                conversaciones
              </div>
            )}
          </div>

          {/* Right Panel - Patient Context Sidebar */}
          <PatientContextSidebar
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            patientData={activePatientData}
          />
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-center" duration={3000} />
    </div>
  );
}
