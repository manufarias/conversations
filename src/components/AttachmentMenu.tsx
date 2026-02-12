import { 
  FileText, 
  Image, 
  Camera, 
  Headphones, 
  User, 
  ListChecks, 
  Calendar, 
  Sticker,
  Paperclip
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface AttachmentOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  iconColor: string;
  onClick: () => void;
}

interface AttachmentMenuProps {
  onAttachDocument: () => void;
  onAttachMedia: () => void;
  onAttachCamera: () => void;
  onAttachAudio: () => void;
  onAttachContact: () => void;
  onAttachSurvey: () => void;
  onAttachEvent: () => void;
  onAttachSticker: () => void;
}

export function AttachmentMenu({
  onAttachDocument,
  onAttachMedia,
  onAttachCamera,
  onAttachAudio,
  onAttachContact,
  onAttachSurvey,
  onAttachEvent,
  onAttachSticker,
}: AttachmentMenuProps) {
  const options: AttachmentOption[] = [
    {
      id: "document",
      label: "Documento",
      icon: <FileText className="h-5 w-5" />,
      iconColor: "text-[#0466c8]",
      onClick: onAttachDocument,
    },
    {
      id: "media",
      label: "Fotos y videos",
      icon: <Image className="h-5 w-5" />,
      iconColor: "text-[#0466c8]",
      onClick: onAttachMedia,
    },
    {
      id: "camera",
      label: "Cámara",
      icon: <Camera className="h-5 w-5" />,
      iconColor: "text-[#ec4899]",
      onClick: onAttachCamera,
    },
    {
      id: "audio",
      label: "Audio",
      icon: <Headphones className="h-5 w-5" />,
      iconColor: "text-[#f97316]",
      onClick: onAttachAudio,
    },
    {
      id: "contact",
      label: "Contacto",
      icon: <User className="h-5 w-5" />,
      iconColor: "text-[#0466c8]",
      onClick: onAttachContact,
    },
    {
      id: "survey",
      label: "Encuesta",
      icon: <ListChecks className="h-5 w-5" />,
      iconColor: "text-[#eab308]",
      onClick: onAttachSurvey,
    },
    {
      id: "event",
      label: "Evento",
      icon: <Calendar className="h-5 w-5" />,
      iconColor: "text-[#ec4899]",
      onClick: onAttachEvent,
    },
    {
      id: "sticker",
      label: "Nuevo sticker",
      icon: <Sticker className="h-5 w-5" />,
      iconColor: "text-[#14b8a6]",
      onClick: onAttachSticker,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background text-foreground hover:bg-accent hover:text-accent-foreground size-9" aria-label="Adjuntar archivo">
        <Paperclip className="h-5 w-5" />
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-2" 
        align="end" 
        side="top"
        sideOffset={8}
      >
        <div className="flex flex-col gap-0.5">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={option.onClick}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left w-full"
            >
              <div className={option.iconColor}>
                {option.icon}
              </div>
              <span className="text-sm text-foreground">{option.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
