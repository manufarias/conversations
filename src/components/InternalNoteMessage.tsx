import { StickyNote } from "lucide-react";

export interface InternalNote {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

interface InternalNoteMessageProps {
  note: InternalNote;
}

export function InternalNoteMessage({ note }: InternalNoteMessageProps) {
  return (
    <div className="flex justify-center my-3 px-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 max-w-2xl w-full shadow-sm">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <StickyNote className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-amber-900">
                Nota Interna
              </span>
              <span className="text-xs text-amber-600">
                • Solo visible para operadores
              </span>
            </div>
            <p className="text-sm text-amber-950 whitespace-pre-wrap">
              {note.text}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-amber-700">
              <span>{note.author}</span>
              <span>•</span>
              <span>{note.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
