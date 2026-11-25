import { FILTER_LABEL, type TaskFilter } from "@/lib/tasks";
import { cn } from "@/lib/utils";

interface TaskFiltersProps {
  value: TaskFilter;
  onChange: (filter: TaskFilter) => void;
  counts: Record<TaskFilter, number>;
}

const FILTERS: TaskFilter[] = ["all", "pending", "done"];

export function TaskFilters({ value, onChange, counts }: TaskFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar tarefas por status"
      className="grid w-full grid-cols-3 gap-1 rounded-lg bg-muted p-1 sm:w-auto"
    >
      {FILTERS.map((f) => {
        const active = f === value;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f)}
            className={cn(
              "focus-ring flex min-h-10 cursor-pointer items-center justify-center gap-1 rounded-md px-1.5 text-sm sm:gap-1.5 sm:px-3 font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {FILTER_LABEL[f]}
            <span
              className={cn(
                "rounded-full px-1.5 text-xs tabular-nums",
                active ? "bg-primary-foreground/20" : "bg-background",
              )}
            >
              {counts[f]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
