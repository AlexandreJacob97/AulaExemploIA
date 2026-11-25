import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FeedbackMessageProps {
  kind: "success" | "error";
  message: string;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export function FeedbackMessage({ kind, message, action, onDismiss, className }: FeedbackMessageProps) {
  const isError = kind === "error";
  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-card",
        isError
          ? "border-destructive bg-destructive-soft text-foreground"
          : "border-success-border bg-success-soft text-success-foreground",
        className,
      )}
    >
      {isError ? (
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <div className="min-w-0 flex-1">
        <p className="break-words font-medium">
          <span className="sr-only">{isError ? "Erro: " : "Sucesso: "}</span>
          {message}
        </p>
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar mensagem"
          className="focus-ring -m-1.5 inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
