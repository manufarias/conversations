export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-1 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
      <div className="bg-muted text-foreground max-w-[70%] rounded-lg p-3">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
