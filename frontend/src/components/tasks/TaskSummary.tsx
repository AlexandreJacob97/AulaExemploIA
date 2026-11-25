import { CheckCircle2, Circle, ListTodo } from "lucide-react";
import type { ReactNode } from "react";

interface TaskSummaryProps {
  total: number;
  pending: number;
  done: number;
  loading?: boolean | undefined;
}

function Stat({ label, value, icon, loading }: { label: string; value: number; icon: ReactNode; loading?: boolean | undefined }) {
  return (
    <div className="surface-card flex items-center justify-between gap-3 px-4 py-3 sm:flex-col sm:items-start sm:py-4">
      <dt className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="font-display text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
        {loading ? <span className="text-muted-foreground" aria-label="carregando">–</span> : value}
      </dd>
    </div>
  );
}

export function TaskSummary({ total, pending, done, loading }: TaskSummaryProps) {
  return (
    <section aria-labelledby="summary-title">
      <h2 id="summary-title" className="sr-only">
        Resumo das tarefas
      </h2>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="Total" value={total} loading={loading} icon={<ListTodo className="h-4 w-4" aria-hidden="true" />} />
        <Stat
          label="Pendentes"
          value={pending}
          loading={loading}
          icon={<Circle className="h-4 w-4 text-pending-foreground" aria-hidden="true" />}
        />
        <Stat
          label="Concluídas"
          value={done}
          loading={loading}
          icon={<CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />}
        />
      </dl>
    </section>
  );
}
