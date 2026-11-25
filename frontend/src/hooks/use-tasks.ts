import { useCallback, useEffect, useRef, useState } from "react";

import {
  type Task,
} from "@/lib/tasks";
import {
  createTask as createTaskApi,
  deleteTask,
  listTasks,
  updateTask,
} from "@/lib/tasks-api";

export type LoadState = "loading" | "ready" | "error";

export interface Feedback {
  id: number;
  kind: "success" | "error";
  message: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [saveError, setSaveError] = useState(false);
  const pendingSave = useRef<(() => Promise<void>) | null>(null);
  const feedbackSeq = useRef(0);

  const notify = useCallback((kind: Feedback["kind"], message: string) => {
    feedbackSeq.current += 1;
    setFeedback({ id: feedbackSeq.current, kind, message });
  }, []);

  const load = useCallback(async () => {
    setLoadState("loading");
    try {
      const loaded = await listTasks();
      setTasks(loaded);
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const commit = useCallback(async (
    operation: () => Promise<void>,
    successMessage: string,
  ) => {
    try {
      await operation();
      pendingSave.current = null;
      setSaveError(false);
      notify("success", successMessage);
    } catch (error) {
      pendingSave.current = operation;
      setSaveError(true);
      notify(
        "error",
        error instanceof Error
          ? error.message
          : "Não foi possível salvar no servidor.",
      );
    }
  }, [notify]);

  const retrySave = useCallback(async () => {
    const operation = pendingSave.current;
    if (!operation) return;
    await commit(operation, "Alterações salvas no servidor.");
  }, [commit]);

  return {
    tasks,
    loadState,
    feedback,
    saveError,
    reload: load,
    retrySave,
    dismissFeedback: () => setFeedback(null),
    add: (title: string) => {
      void commit(async () => {
        const created = await createTaskApi(title);
        setTasks((current) => [created, ...current]);
      }, `Tarefa "${title}" adicionada.`);
      return true;
    },
    toggle: (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return false;
      const status = task.status === "done" ? "pending" : "done";
      const msg =
        task.status === "done"
          ? `"${task.title}" voltou para pendente.`
          : `"${task.title}" marcada como concluída.`;
      void commit(async () => {
        const updated = await updateTask(id, { status });
        setTasks((current) => current.map((item) => item.id === id ? updated : item));
      }, msg);
      return true;
    },
    rename: (id: string, title: string) => {
      void commit(async () => {
        const updated = await updateTask(id, { title });
        setTasks((current) => current.map((item) => item.id === id ? updated : item));
      }, "Tarefa atualizada.");
      return true;
    },
    remove: (id: string) => {
      const task = tasks.find((t) => t.id === id);
      void commit(async () => {
        await deleteTask(id);
        setTasks((current) => current.filter((item) => item.id !== id));
      }, task ? `"${task.title}" excluída.` : "Tarefa excluída.");
      return true;
    },
  };
}
