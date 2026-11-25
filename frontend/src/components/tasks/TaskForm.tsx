import { Check, Plus, X } from "lucide-react";
import { useId, useState, type FormEvent, type KeyboardEvent, type Ref } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAX_TITLE_LENGTH, validateTitle } from "@/lib/tasks";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  mode: "create" | "edit";
  initialValue?: string;
  /** Returns true when the title was accepted, so the form can reset. */
  onSubmit: (title: string) => boolean;
  onCancel?: () => void;
  inputRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
}

export function TaskForm({ mode, initialValue = "", onSubmit, onCancel, inputRef, disabled }: TaskFormProps) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  const inputId = `${id}-title`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const isEdit = mode === "edit";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = validateTitle(value);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    const accepted = onSubmit(result.title);
    if (accepted && !isEdit) setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (isEdit && e.key === "Escape") {
      e.preventDefault();
      onCancel?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label
        htmlFor={inputId}
        className={cn("mb-1.5 block text-sm font-semibold text-foreground", isEdit && "sr-only")}
      >
        {isEdit ? "Novo título da tarefa" : "Nova tarefa"}
      </label>
      <div className={cn("flex flex-col gap-2", isEdit ? "sm:flex-row sm:items-start" : "sm:flex-row")}>
        <div className="min-w-0 flex-1">
          <Input
            id={inputId}
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            maxLength={MAX_TITLE_LENGTH}
            placeholder={isEdit ? undefined : "Ex.: Estudar Matemática"}
            autoFocus={isEdit}
            autoComplete="off"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={cn(hintId, error && errorId)}
            className={cn(
              "h-11 bg-card text-base focus-visible:ring-2",
              error && "border-destructive focus-visible:ring-destructive",
            )}
          />
          <div className="mt-1 flex items-start justify-between gap-3 text-xs">
            <p id={errorId} role={error ? "alert" : undefined} className="font-medium text-destructive">
              {error}
            </p>
            <p id={hintId} className="shrink-0 tabular-nums text-muted-foreground">
              <span className="sr-only">Caracteres usados: </span>
              {value.length}/{MAX_TITLE_LENGTH}
            </p>
          </div>
        </div>
        {isEdit ? (
          <div className="flex gap-2">
            <Button type="submit" size="touch" className="flex-1 sm:flex-none">
              <Check aria-hidden="true" />
              Salvar
            </Button>
            <Button type="button" variant="outline" size="touch" className="flex-1 sm:flex-none" onClick={onCancel}>
              <X aria-hidden="true" />
              Cancelar
            </Button>
          </div>
        ) : (
          <Button type="submit" size="touch" disabled={disabled} className="sm:self-start">
            <Plus aria-hidden="true" />
            Adicionar tarefa
          </Button>
        )}
      </div>
    </form>
  );
}
