import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { TaskFilter } from "@/lib/tasks";

const MESSAGES: Record<Exclude<TaskFilter, "all">, { title: string; text: string }> = {
  pending: { title: "Nenhuma tarefa pendente", text: "Tudo em dia! Todas as suas tarefas estão concluídas." },
  done: { title: "Nenhuma tarefa concluída", text: "Marque uma tarefa como concluída para vê-la aqui." },
};

export function NoResults({ filter, onShowAll }: { filter: Exclude<TaskFilter, "all">; onShowAll: () => void }) {
  const msg = MESSAGES[filter];
  return (
    <div className="flex flex-col items-center rounded-lg bg-muted px-6 py-8 text-center">
      <SearchX className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      <h3 className="mt-2 text-base font-semibold text-foreground">{msg.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{msg.text}</p>
      <Button variant="link" className="mt-2 h-10" onClick={onShowAll}>
        Ver todas as tarefas
      </Button>
    </div>
  );
}
