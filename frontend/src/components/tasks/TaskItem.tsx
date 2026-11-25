import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { STATUS_LABEL, type Task } from "@/lib/tasks";
import { cn } from "@/lib/utils";

import { TaskForm } from "./TaskForm";

interface TaskItemProps {
  task: Task;
  editing: boolean;
  onToggle: (id: string) => void;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSave: (id: string, title: string) => boolean;
  onRequestDelete: (task: Task) => void;
}

export function TaskItem({ task, editing, onToggle, onStartEdit, onCancelEdit, onSave, onRequestDelete }: TaskItemProps) {
  const done = task.status === "done";
  const checkboxId = `task-${task.id}`;
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const wasEditing = useRef(editing);

  // Return keyboard focus to the edit button after leaving edit mode.
  useEffect(() => {
    if (wasEditing.current && !editing) editBtnRef.current?.focus();
    wasEditing.current = editing;
  }, [editing]);

  if (editing) {
    return (
      <li className="animate-task-in rounded-lg border border-ring bg-card p-3">
        <TaskForm
          mode="edit"
          initialValue={task.title}
          onSubmit={(title) => onSave(task.id, title)}
          onCancel={onCancelEdit}
        />
      </li>
    );
  }

  return (
    <li
      className={cn(
        "animate-task-in flex items-start gap-2 rounded-lg border p-3 transition-colors sm:items-center sm:gap-3",
        done ? "border-success-border bg-success-soft/50" : "border-border bg-card",
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex h-6 items-center">
          <Checkbox
            id={checkboxId}
            checked={done}
            onCheckedChange={() => onToggle(task.id)}
            aria-label={done ? `Marcar "${task.title}" como pendente` : `Marcar "${task.title}" como concluída`}
            className="relative h-5 w-5 rounded-md border-2 border-input bg-card after:absolute after:-inset-2.5 after:content-[''] focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=checked]:border-success data-[state=checked]:bg-success data-[state=checked]:text-primary-foreground"
          />
        </div>
        <div className="min-w-0 flex-1">
          <label
            htmlFor={checkboxId}
            className={cn(
              "block cursor-pointer break-words text-base leading-6",
              done ? "text-muted-foreground line-through decoration-2" : "text-foreground",
            )}
          >
            {task.title}
          </label>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge variant={done ? "done" : "pending"} className="gap-1">
              {done ? (
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Circle className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span className="sr-only">Status: </span>
              {STATUS_LABEL[task.status]}
            </Badge>
            {task.demo && (
              <Badge variant="outline" className="font-medium text-muted-foreground">
                Exemplo
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="-my-1 -mr-1 flex shrink-0 gap-0.5 sm:my-0 sm:mr-0 sm:gap-1">
        <Button
          ref={editBtnRef}
          variant="ghost"
          size="icon-touch"
          onClick={() => onStartEdit(task.id)}
          aria-label={`Editar tarefa "${task.title}"`}
          title="Editar"
        >
          <Pencil aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon-touch"
          onClick={() => onRequestDelete(task)}
          aria-label={`Excluir tarefa "${task.title}"`}
          title="Excluir"
          className="text-destructive hover:bg-destructive-soft hover:text-destructive"
        >
          <Trash2 aria-hidden="true" />
        </Button>
      </div>
    </li>
  );
}
