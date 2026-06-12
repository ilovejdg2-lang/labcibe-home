import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type StatusMessageProps = {
  variant: "loading" | "success" | "error";
  message: string;
  className?: string;
};

const variantStyles = {
  loading: "border-gray-200 bg-gray-50 text-muted-foreground",
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-destructive",
};

const StatusMessage = ({ variant, message, className }: StatusMessageProps) => {
  const Icon =
    variant === "loading"
      ? Loader2
      : variant === "success"
        ? CheckCircle2
        : AlertCircle;

  return (
    <div
      role={variant === "loading" ? "status" : "alert"}
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 rounded-md border px-4 py-3 text-sm",
        variantStyles[variant],
        className
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          variant === "loading" && "animate-spin"
        )}
        aria-hidden
      />
      <p>{message}</p>
    </div>
  );
};

export default StatusMessage;
