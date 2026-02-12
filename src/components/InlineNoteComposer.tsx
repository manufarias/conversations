import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { StickyNote, X } from "lucide-react";

interface InlineNoteComposerProps {
  initialText?: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

export function InlineNoteComposer({ initialText = "", onSave, onCancel }: InlineNoteComposerProps) {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus the textarea when component mounts
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl + Enter to save
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (text.trim()) {
        onSave(text);
      }
    }
    // Escape to cancel
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <div className="border-t border-border bg-amber-50/50 p-4 animate-in slide-in-from-bottom-2 duration-200">
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StickyNote className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-900">
              Nueva Nota Interna
            </span>
            <span className="text-xs text-amber-600">
              Solo visible para operadores
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-6 w-6 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Textarea */}
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu nota aquí... (⌘Enter para guardar, Esc para cancelar)"
          className="min-h-[100px] bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-400 text-sm resize-none"
        />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-amber-600">
            Puedes usar **negrita** y • viñetas
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="text-amber-700 border-amber-300 hover:bg-amber-100"
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={() => text.trim() && onSave(text)}
              disabled={!text.trim()}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Guardar Nota
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
