/**
 * This is an example showing how to enhance ConversationView.tsx with the new features.
 * Copy the relevant sections into your actual ConversationView.tsx
 */

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Paperclip, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

// NEW IMPORTS - Add these
import { EnhancedSlashCommandMenu, SlashCommand, getFilteredEnhancedCommands, parseSlashCommand } from "./EnhancedSlashCommandMenu";
import { InlineNoteComposer } from "./InlineNoteComposer";
import { QuickActionsMenu } from "./QuickActionsMenu";

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOperator: boolean;
}

export type TicketStatus = "New" | "Open" | "Pending" | "Resolved";

// UPDATED INTERFACE - Add new props
interface ConversationViewProps {
  patientName: string;
  messages: Message[];
  ticketSubject: string;
  ticketStatus: TicketStatus;
  onSendMessage: (text: string) => void;
  onOpenProfile: () => void;
  onStatusChange: (status: TicketStatus) => void;
  
  // NEW PROPS
  onOpenTurno?: (params?: { specialty?: string; time?: string; modality?: string }) => void;
  onCreateNote?: (text: string) => void;
  onTogglePin?: () => void;
  onToggleMute?: () => void;
  isPinned?: boolean;
  isMuted?: boolean;
}

export function ConversationView({ 
  patientName, 
  messages, 
  ticketSubject,
  ticketStatus,
  onSendMessage,
  onOpenProfile,
  onStatusChange,
  
  // NEW PROPS
  onOpenTurno,
  onCreateNote,
  onTogglePin,
  onToggleMute,
  isPinned = false,
  isMuted = false,
}: ConversationViewProps) {
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashSearchQuery, setSlashSearchQuery] = useState("");
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // NEW STATE
  const [showNoteComposer, setShowNoteComposer] = useState(false);

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
      const filteredCommands = getFilteredEnhancedCommands(slashSearchQuery);
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

  // UPDATED HANDLER - Enhanced to handle new command actions
  const handleSlashCommandSelect = (command: SlashCommand) => {
    // Get any parameters that were typed after the command
    const commandText = messageText.trim();
    const parameters = commandText.includes(' ') 
      ? commandText.substring(commandText.indexOf(' ') + 1) 
      : '';

    // Handle special actions
    if (command.action === 'open_turno') {
      const { params } = parseSlashCommand(commandText);
      onOpenTurno?.(params);
      setMessageText("");
    } else if (command.action === 'create_nota') {
      const { params } = parseSlashCommand(commandText);
      if (params.text) {
        // If text was provided inline, create note immediately
        onCreateNote?.(params.text);
        setMessageText("");
      } else {
        // Otherwise, open the note composer
        setShowNoteComposer(true);
        setMessageText("");
      }
    } else if (command.action === 'pin_conversation') {
      onTogglePin?.();
      setMessageText("");
    } else if (command.action === 'mute_conversation') {
      onToggleMute?.();
      setMessageText("");
    } else if (command.action === 'close_ticket') {
      onStatusChange("Resolved");
      setMessageText("");
    } else if (command.text) {
      // Regular text commands - insert the text
      setMessageText(command.text);
    }
    
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

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Select value={ticketStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* NEW: Quick Actions Menu */}
            <QuickActionsMenu
              isPinned={isPinned}
              isMuted={isMuted}
              onOpenTurno={() => onOpenTurno?.({})}
              onCreateNote={() => setShowNoteComposer(true)}
              onMarkResolved={() => onStatusChange("Resolved")}
              onTogglePin={onTogglePin}
              onToggleMute={onToggleMute}
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOperator ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.isOperator
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* NEW: Inline Note Composer */}
      {showNoteComposer && (
        <InlineNoteComposer
          onSave={(text) => {
            onCreateNote?.(text);
            setShowNoteComposer(false);
          }}
          onCancel={() => setShowNoteComposer(false)}
        />
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border relative">
        {/* NEW: Enhanced Slash Command Menu */}
        {showSlashMenu && (
          <EnhancedSlashCommandMenu
            searchQuery={slashSearchQuery}
            selectedIndex={selectedCommandIndex}
            onSelect={handleSlashCommandSelect}
          />
        )}

        {selectedFile && (
          <div className="mb-2 p-2 bg-muted rounded-md flex items-center justify-between">
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

        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={messageText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message or / for commands..."
            className="flex-1"
          />
          
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileSelect}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Button onClick={handleSend} disabled={!messageText.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* NEW: Hint for slash commands */}
        {messageText.startsWith('/') && !showSlashMenu && (
          <p className="text-xs text-muted-foreground mt-2">
            Tip: Use Tab or ↓ to navigate commands, Enter to select
          </p>
        )}
      </div>
    </div>
  );
}
