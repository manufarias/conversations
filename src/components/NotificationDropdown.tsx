import { useState, useEffect } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Bell, MessageSquare, Volume2, VolumeX } from "lucide-react";
import { Badge } from "./ui/badge";

export interface Notification {
  id: string;
  patientId: string;
  patientName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onNotificationClick?: (patientId: string) => void;
}

export function NotificationDropdown({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick,
}: NotificationDropdownProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Load sound preference on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('notificationSoundEnabled');
    if (savedPreference !== null) {
      setSoundEnabled(savedPreference === 'true');
    }
  }, []);

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Store preference in localStorage
    localStorage.setItem('notificationSoundEnabled', (!soundEnabled).toString());
  };

  const handleNotificationItemClick = (notification: Notification) => {
    if (onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    if (onNotificationClick) {
      onNotificationClick(notification.patientId);
    }
    // Close the dropdown after clicking
    setOpen(false);
  };

  // Expose sound enabled state for parent component
  React.useEffect(() => {
    // Store in window for access by App component
    (window as any).notificationSoundEnabled = soundEnabled;
  }, [soundEnabled]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button 
          className={`relative p-2 rounded-lg transition-all duration-200 ${
            open 
              ? 'bg-[#d2e1f8]'
              : unreadCount > 0 
                ? 'bg-[#e8f0ff] hover:bg-[#d2e1f8]' 
                : 'hover:bg-[#f8f8f8]'
          }`}
          aria-label={`Notificaciones${unreadCount > 0 ? ` (${unreadCount} sin leer)` : ''}`}
        >
          <motion.div
            animate={open ? { rotate: [0, -10, 10, -10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Bell 
              className="h-6 w-6 transition-all duration-200" 
              style={{ stroke: "#1A66FC", strokeWidth: 2 }} 
            />
          </motion.div>
          {unreadCount > 0 && (
            <div className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#1A66FC] text-white text-[10px] font-medium shadow-md animate-in zoom-in-50 duration-200">
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[380px] max-h-[500px] overflow-hidden flex flex-col p-0 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border bg-[#f8f9fb]">
          <div className="flex items-center justify-between">
            <DropdownMenuLabel className="p-0 text-[#40435b] font-[700]">
              Notificaciones
            </DropdownMenuLabel>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="h-7 text-xs text-[#1A66FC] hover:text-[#1A66FC] hover:bg-[#e8f0ff]"
              >
                Marcar todas como leídas
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto flex-1 max-h-[360px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">
                No hay notificaciones nuevas
              </p>
            </div>
          ) : (
            <div className="py-1">
              <AnimatePresence mode="popLayout">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <DropdownMenuItem
                  key={notification.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-[#f8f9fb] focus:bg-[#f8f9fb] active:bg-[#e8f0ff] transition-all duration-200 ${
                    !notification.isRead ? "bg-[#f1f6ff]" : ""
                  }`}
                  onClick={() => handleNotificationItemClick(notification)}
                >
                  <div className="flex gap-3 w-full pointer-events-none">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-9 w-9 rounded-full bg-[#e8f0ff] flex items-center justify-center">
                        <MessageSquare
                          className="h-4 w-4"
                          style={{ stroke: "#1A66FC", strokeWidth: 2 }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium text-[#40435b] text-sm">
                          {notification.patientName}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      {!notification.isRead && (
                        <div className="mt-2">
                          <Badge
                            variant="default"
                            className="bg-[#1A66FC] text-white text-xs px-2 py-0.5"
                          >
                            Nuevo
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer - Sound Toggle */}
        <div className="border-t border-border bg-[#f8f9fb] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-[#6B6F93]" />
              ) : (
                <VolumeX className="h-4 w-4 text-[#6B6F93]" />
              )}
              <span className="text-sm text-[#40435b]">
                Sonidos de notificación
              </span>
            </div>
            <Switch
              checked={soundEnabled}
              onCheckedChange={handleToggleSound}
              className="data-[state=checked]:bg-[#1A66FC]"
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
