import { MessageCircle, Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export type Channel = "whatsapp" | "email" | "all";

interface ChannelSelectorProps {
  activeChannel: Channel;
  onChannelChange: (channel: Channel) => void;
}

export function ChannelSelector({ activeChannel, onChannelChange }: ChannelSelectorProps) {
  const channels = [
    {
      id: "whatsapp" as Channel,
      label: "WhatsApp",
      icon: MessageCircle,
      activeIconColor: "#023BAC",
      inactiveIconColor: "#AFC9FE",
    },
    {
      id: "email" as Channel,
      label: "Correo",
      icon: Mail,
      activeIconColor: "#023BAC",
      inactiveIconColor: "#AFC9FE",
    },
  ];

  return (
    <div className="w-[60px] h-full bg-[#f1f6ff] border-r border-border flex flex-col items-center py-4 gap-2 flex-shrink-0">
      <TooltipProvider delayDuration={300}>
        {channels.map((channel) => {
          const Icon = channel.icon;
          const isActive = activeChannel === channel.id;
          
          return (
            <Tooltip key={channel.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChannelChange(channel.id)}
                  className={`
                    w-11 h-11 rounded-[10px] flex items-center justify-center pl-1
                    transition-all duration-200
                    ${isActive ? 'bg-[#d2e1f8]' : 'bg-transparent hover:bg-[#e8f0f9]'}
                  `}
                  aria-label={channel.label}
                >
                  <Icon 
                    className="h-6 w-6"
                    style={{
                      stroke: isActive ? channel.activeIconColor : channel.inactiveIconColor,
                      strokeWidth: 2,
                    }}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {channel.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
