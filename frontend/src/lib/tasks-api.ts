import type { Task } from "./tasks";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let message = "Não foi possível comunicar com o servidor.";
    try {
      const body = await response.json() as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // Keep the generic message when the response has no JSON body.
    }
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function listTasks(): Promise<Task[]> {
  return request<Task[]>("/api/tarefas");
}

export function createTask(title: string): Promise<Task> {
  return request<Task>("/api/tarefas", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function updateTask(
  id: string,
  fields: Partial<Pick<Task, "title" | "status">>,
): Promise<Task> {
  return request<Task>(`/api/tarefas/${id}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
  });
}

export function deleteTask(id: string): Promise<void> {
  return request<void>(`/api/tarefas/${id}`, { method: "DELETE" });
}
