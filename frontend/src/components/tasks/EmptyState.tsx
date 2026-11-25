import { ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyState({ onAddFirst }: { onAddFirst: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-input px-6 py-10 text-center">
      <ClipboardList className="h-10 w-10 text-primary" aria-hidden="true" />
      <h3 className="mt-3 text-lg font-semibold text-foreground">Nenhuma tarefa cadastrada</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Digite uma atividade no campo “Nova tarefa” e clique em “Adicionar tarefa” para começar.
      </p>
      <Button variant="outline" size="touch" className="mt-4" onClick={onAddFirst}>
        Adicionar primeira tarefa
      </Button>
    </div>
  );
}
