import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Paperclip, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { SlashCommandMenu, SlashCommand, getFilteredCommands } from "./SlashCommandMenu";

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOperator: boolean;
}

export type TicketStatus = "New" | "Open" | "Pending" | "Resolved";

interface ConversationViewProps {
  patientName: string;
  messages: Message[];
  ticketSubject: string;
  ticketStatus: TicketStatus;
  onSendMessage: (text: string) => void;
  onOpenProfile: () => void;
  onStatusChange: (status: TicketStatus) => void;
}

export function ConversationView({ 
  patientName, 
  messages, 
  ticketSubject,
  ticketStatus,
  onSendMessage,
  onOpenProfile,
  onStatusChange
}: ConversationViewProps) {
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashSearchQuery, setSlashSearchQuery] = useState("");
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
      setSelectedFile(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessageText(value);

    // Check if user typed "/" at the start or after clearing
    if (value === "/" || (value.startsWith("/") && !value.includes(" "))) {
      setShowSlashMenu(true);
      setSlashSearchQuery(value.slice(1)); // Remove the "/" for search
      setSelectedCommandIndex(0); // Reset selection to first item
    } else {
      setShowSlashMenu(false);
      setSlashSearchQuery("");
      setSelectedCommandIndex(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // When slash menu is open, handle special keys
    if (showSlashMenu) {
      const filteredCommands = getFilteredCommands(slashSearchQuery);
      const maxIndex = filteredCommands.length - 1;

      // Arrow Down - move selection down
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedCommandIndex((prev) => 
          prev < maxIndex ? prev + 1 : 0
        );
        return;
      }
      
      // Arrow Up - move selection up
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedCommandIndex((prev) => 
          prev > 0 ? prev - 1 : maxIndex
        );
        return;
      }
      
      // Escape closes the menu
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowSlashMenu(false);
        setSlashSearchQuery("");
        setMessageText("");
        setSelectedCommandIndex(0);
        return;
      }
      
      // Enter selects the current command
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands.length > 0 && selectedCommandIndex >= 0 && selectedCommandIndex < filteredCommands.length) {
          handleSlashCommandSelect(filteredCommands[selectedCommandIndex]);
        }
        return;
      }
    } else {
      // When menu is not open, Enter sends the message
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    }
  };

  const handleSlashCommandSelect = (command: SlashCommand) => {
    setMessageText(command.text);
    setShowSlashMenu(false);
    setSlashSearchQuery("");
    setSelectedCommandIndex(0);
    // Focus back on input
    inputRef.current?.focus();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Close slash menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showSlashMenu && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSlashMenu(false);
        setSlashSearchQuery("");
        setSelectedCommandIndex(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSlashMenu]);

  // Reset selected index when search query changes
  useEffect(() => {
    if (showSlashMenu) {
      setSelectedCommandIndex(0);
    }
  }, [slashSearchQuery, showSlashMenu]);

  const getStatusVariant = (status: TicketStatus): "default" | "secondary" | "destructive" | "outline" => {
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

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - Conversation Summary */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Patient Name - Clickable */}
            <button
              onClick={onOpenProfile}
              className="group flex items-center gap-2 mb-2 hover:opacity-70 transition-opacity"
              aria-label="View patient profile"
            >
              <h2 className="text-foreground">{patientName}</h2>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
            
            {/* Ticket Subject Line */}
            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
              Subject: {ticketSubject}
            </p>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Select value={ticketStatus} onValueChange={onStatusChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">
                  <Badge variant={getStatusVariant("New")}>New</Badge>
                </SelectItem>
                <SelectItem value="Open">
                  <Badge variant={getStatusVariant("Open")}>Open</Badge>
                </SelectItem>
                <SelectItem value="Pending">
                  <Badge variant={getStatusVariant("Pending")}>Pending</Badge>
                </SelectItem>
                <SelectItem value="Resolved">
                  <Badge variant={getStatusVariant("Resolved")}>Resolved</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOperator ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isOperator
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isOperator ? 'text-primary-foreground/80' : 'text-foreground/60'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Composer */}
      <div className="p-4 border-t border-border">
        {selectedFile && (
          <div className="mb-2 p-2 bg-muted rounded flex items-center justify-between">
            <span className="text-sm truncate">{selectedFile.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFile(null)}
            >
              Remove
            </Button>
          </div>
        )}
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
              placeholder="Type a message or / for quick actions..."
              className="resize-none"
            />
          </div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => document.getElementById('file-upload')?.click()}
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleSend}
            disabled={!messageText.trim()}
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
