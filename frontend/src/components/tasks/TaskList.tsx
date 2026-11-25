import type { Task } from "@/lib/tasks";

import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  editingId: string | null;
  label: string;
  onToggle: (id: string) => void;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSave: (id: string, title: string) => boolean;
  onRequestDelete: (task: Task) => void;
}

export function TaskList({ tasks, editingId, label, ...handlers }: TaskListProps) {
  return (
    <ul className="flex flex-col gap-2" aria-label={label}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} editing={editingId === task.id} {...handlers} />
      ))}
    </ul>
  );
}

export function TaskListSkeleton() {
  return (
    <div role="status" aria-label="Carregando tarefas" className="flex flex-col gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex animate-pulse items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="h-5 w-5 rounded-md bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
        </div>
      ))}
      <span className="sr-only">Carregando tarefas salvas…</span>
    </div>
  );
}
