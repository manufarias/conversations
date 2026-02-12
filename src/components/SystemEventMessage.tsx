import { SystemEventType } from "./PatientTimeline";
import { FileText, RefreshCw, Edit3 } from "lucide-react";

interface SystemEventMessageProps {
  eventType: SystemEventType;
  text: string;
  timestamp: string;
  metadata?: {
    oldValue?: string;
    newValue?: string;
  };
}

export function SystemEventMessage({ eventType, text, timestamp, metadata }: SystemEventMessageProps) {
  const isInternalNote = eventType === "internal_note";
  const isStatusChange = eventType === "status_change";
  const isSubjectChange = eventType === "subject_change";

  const getIcon = () => {
    if (isInternalNote) return <FileText className="h-4 w-4" />;
    if (isStatusChange) return <RefreshCw className="h-4 w-4" />;
    if (isSubjectChange) return <Edit3 className="h-4 w-4" />;
    return null;
  };

  const getStyles = () => {
    if (isInternalNote) {
      return {
        container: "bg-amber-50 border border-amber-200",
        text: "text-amber-900",
        timestamp: "text-amber-700/70",
        icon: "text-amber-600",
      };
    }
    return {
      container: "bg-gray-50 border border-gray-200",
      text: "text-gray-700 text-sm",
      timestamp: "text-gray-500 text-xs",
      icon: "text-gray-500",
    };
  };

  const styles = getStyles();

  return (
    <div className="flex justify-center my-3">
      <div className={`${styles.container} rounded-lg px-4 py-3 max-w-[600px] w-full shadow-sm`}>
        <div className="flex items-start gap-3">
          <div className={`${styles.icon} mt-0.5 flex-shrink-0`}>
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`${styles.text} ${isInternalNote ? '' : 'leading-relaxed'}`}>
              {text}
            </p>
            {metadata && (isStatusChange || isSubjectChange) && (
              <div className="mt-1 text-xs text-gray-600">
                {metadata.oldValue && metadata.newValue && (
                  <span>
                    <span className="line-through opacity-60">{metadata.oldValue}</span>
                    {" → "}
                    <span className="font-medium">{metadata.newValue}</span>
                  </span>
                )}
              </div>
            )}
            <p className={`${styles.timestamp} mt-1.5`}>
              {timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
