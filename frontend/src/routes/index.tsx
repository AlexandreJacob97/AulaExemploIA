import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ConfirmDialog } from "@/components/tasks/ConfirmDialog";
import { EmptyState } from "@/components/tasks/EmptyState";
import { FeedbackMessage } from "@/components/tasks/FeedbackMessage";
import { Header } from "@/components/tasks/Header";
import { NoResults } from "@/components/tasks/NoResults";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList, TaskListSkeleton } from "@/components/tasks/TaskList";
import { TaskSummary } from "@/components/tasks/TaskSummary";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/use-tasks";
import { FILTER_LABEL, filterTasks, summarize, type Task, type TaskFilter } from "@/lib/tasks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ListaBatata — Minha Lista de Tarefas" },
      {
        name: "description",
        content: "Organize suas atividades da semana: cadastre, conclua, edite e filtre tarefas.",
      },
      { property: "og:title", content: "ListaBatata — Minha Lista de Tarefas" },
      {
        property: "og:description",
        content:         "Uma lista de tarefas simples para estudantes, salva no servidor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const t = useTasks();
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Task | null>(null);
  const newTaskInput = useRef<HTMLInputElement>(null);
  const listHeading = useRef<HTMLHeadingElement>(null);

  const summary = useMemo(() => summarize(t.tasks), [t.tasks]);
  const visible = useMemo(() => filterTasks(t.tasks, filter), [t.tasks, filter]);
  const loading = t.loadState === "loading";
  const { feedback, dismissFeedback } = t;

  // Success messages fade out on their own; errors stay until dismissed.
  useEffect(() => {
    if (feedback?.kind !== "success") return;
    const timer = window.setTimeout(dismissFeedback, 3500);
    return () => window.clearTimeout(timer);
  }, [feedback, dismissFeedback]);

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
        <Header />

        {t.loadState === "error" ? (
          <FeedbackMessage
            kind="error"
            message="Não conseguimos conectar ao backend. Verifique se o servidor está em execução e tente novamente."
            action={
              <Button variant="outline" size="touch" onClick={t.reload}>
                <RotateCcw aria-hidden="true" />
                Tentar novamente
              </Button>
            }
          />
        ) : (
          <>
            <TaskSummary {...summary} loading={loading} />

            <section className="surface-card p-4 sm:p-5" aria-label="Cadastrar tarefa">
              <TaskForm
                mode="create"
                inputRef={newTaskInput}
                disabled={loading}
                onSubmit={(title) => {
                  t.add(title);
                  if (filter === "done") setFilter("all");
                  return true;
                }}
              />
            </section>

            {t.saveError && (
              <FeedbackMessage
                kind="error"
                message="Suas últimas alterações ainda não foram salvas no servidor."
                action={
                  <Button variant="outline" size="touch" onClick={t.retrySave}>
                    <RotateCcw aria-hidden="true" />
                    Tentar salvar novamente
                  </Button>
                }
              />
            )}

            <section className="surface-card flex flex-col gap-4 p-4 sm:p-5" aria-labelledby="list-title">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 id="list-title" ref={listHeading} tabIndex={-1} className="text-xl font-semibold outline-none">
                  Suas tarefas
                </h2>
                <TaskFilters
                  value={filter}
                  onChange={(f) => {
                    setFilter(f);
                    setEditingId(null);
                  }}
                  counts={{ all: summary.total, pending: summary.pending, done: summary.done }}
                />
              </div>

              {loading ? (
                <TaskListSkeleton />
              ) : t.tasks.length === 0 ? (
                <EmptyState onAddFirst={() => newTaskInput.current?.focus()} />
              ) : visible.length === 0 && filter !== "all" ? (
                <NoResults filter={filter} onShowAll={() => setFilter("all")} />
              ) : (
                <TaskList
                  tasks={visible}
                  label={`Tarefas: ${FILTER_LABEL[filter]}`}
                  editingId={editingId}
                  onToggle={t.toggle}
                  onStartEdit={setEditingId}
                  onCancelEdit={() => setEditingId(null)}
                  onSave={(id, title) => {
                    t.rename(id, title);
                    setEditingId(null);
                    return true;
                  }}
                  onRequestDelete={setToDelete}
                />
              )}
            </section>
          </>
        )}

        <footer className="text-center text-xs text-muted-foreground">
          As tarefas ficam guardadas no backend.
        </footer>
      </main>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-4"
      >
        {feedback && (
          <div key={feedback.id} className="animate-task-in pointer-events-auto w-full max-w-md">
            <FeedbackMessage kind={feedback.kind} message={feedback.message} onDismiss={dismissFeedback} />
          </div>
        )}
      </div>

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
        title="Excluir tarefa?"
        description={toDelete ? `A tarefa "${toDelete.title}" será removida da sua lista. Essa ação não pode ser desfeita.` : ""}
        confirmLabel="Excluir"
        onConfirm={() => {
          if (toDelete) t.remove(toDelete.id);
          setToDelete(null);
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          listHeading.current?.focus();
        }}
      />
    </div>
  );
}
