// Pure task logic + localStorage access. No React here so the rules stay testable.

export type TaskStatus = "pending" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
  /** Marks tasks that came from the demonstration seed. */
  demo?: boolean;
}

export type TaskFilter = "all" | "pending" | "done";

export const STORAGE_KEY = "listabatata:tasks:v1";
export const MAX_TITLE_LENGTH = 100;

export const STATUS_LABEL: Record<TaskStatus, string> = {
  pending: "Pendente",
  done: "Concluída",
};

export const FILTER_LABEL: Record<TaskFilter, string> = {
  all: "Todas",
  pending: "Pendentes",
  done: "Concluídas",
};

export type TitleValidation = { ok: true; title: string } | { ok: false; error: string };

export function validateTitle(raw: string): TitleValidation {
  const title = raw.trim();
  if (!title) return { ok: false, error: "Digite um título para a tarefa." };
  if (title.length > MAX_TITLE_LENGTH)
    return { ok: false, error: `O título pode ter no máximo ${MAX_TITLE_LENGTH} caracteres.` };
  return { ok: true, title };
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createTask(title: string): Task {
  return { id: newId(), title, status: "pending", createdAt: Date.now() };
}

export function addTask(tasks: Task[], title: string): Task[] {
  return [createTask(title), ...tasks];
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((t) =>
    t.id === id ? { ...t, status: t.status === "done" ? "pending" : "done" } : t,
  );
}

export function renameTask(tasks: Task[], id: string, title: string): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, title } : t));
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id);
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === "all") return tasks;
  return tasks.filter((t) => t.status === filter);
}

export function summarize(tasks: Task[]) {
  const done = tasks.filter((t) => t.status === "done").length;
  return { total: tasks.length, pending: tasks.length - done, done };
}

export function makeDemoTasks(): Task[] {
  const now = Date.now();
  return [
    { title: "Revisar anotações de História", status: "pending" as const },
    { title: "Entregar lista de exercícios de Física", status: "pending" as const },
    { title: "Ler capítulo 3 de Literatura", status: "done" as const },
  ].map((t, i) => ({ ...t, id: newId(), createdAt: now - i * 1000, demo: true }));
}

function isTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<Record<keyof Task, unknown>>;
  return (
    typeof v.id === "string" &&
    typeof v.title === "string" &&
    (v.status === "pending" || v.status === "done") &&
    typeof v.createdAt === "number"
  );
}

/**
 * Reads tasks from storage. Returns `null` when nothing was ever saved
 * (first visit), so the caller can seed demo data. Throws on real failures.
 */
export function loadTasks(storage: Storage): Task[] | null {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("Formato de dados inválido.");
  return parsed.filter(isTask);
}

export function saveTasks(storage: Storage, tasks: Task[]): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
