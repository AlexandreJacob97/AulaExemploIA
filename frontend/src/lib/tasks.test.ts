import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useTasks } from "@/hooks/use-tasks";
import {
  MAX_TITLE_LENGTH,
  addTask,
  filterTasks,
  removeTask,
  renameTask,
  summarize,
  toggleTask,
  validateTitle,
  type Task,
} from "./tasks";

describe("regras das tarefas", () => {
  it("nova tarefa começa como pendente e com id único", () => {
    const a = addTask([], "Estudar Matemática");
    const b = addTask(a, "Ler livro");
    expect(a[0]!.status).toBe("pending");
    expect(a[0]!.title).toBe("Estudar Matemática");
    expect(b[0]!.id).not.toBe(b[1]!.id);
  });

  it("não aceita título vazio ou só com espaços", () => {
    expect(validateTitle("").ok).toBe(false);
    expect(validateTitle("    ").ok).toBe(false);
  });

  it("limita o título a 100 caracteres", () => {
    expect(MAX_TITLE_LENGTH).toBe(100);
    expect(validateTitle("a".repeat(100)).ok).toBe(true);
    expect(validateTitle("a".repeat(101)).ok).toBe(false);
  });

  it("alterna entre pendente e concluída", () => {
    const list = addTask([], "Estudar Matemática");
    const id = list[0]!.id;
    const done = toggleTask(list, id);
    expect(done[0]!.status).toBe("done");
    expect(toggleTask(done, id)[0]!.status).toBe("pending");
  });

  it("edita e remove tarefas", () => {
    const list = addTask([], "Estudar Matemática");
    const id = list[0]!.id;
    expect(renameTask(list, id, "Estudar Álgebra")[0]!.title).toBe("Estudar Álgebra");
    expect(removeTask(list, id)).toHaveLength(0);
  });

  it("filtros não alteram os dados originais e contadores batem", () => {
    let list: Task[] = [];
    list = addTask(list, "A");
    list = addTask(list, "B");
    list = addTask(list, "C");
    list = toggleTask(list, list[0]!.id);
    const snapshot = JSON.stringify(list);

    expect(filterTasks(list, "all")).toHaveLength(3);
    expect(filterTasks(list, "pending")).toHaveLength(2);
    expect(filterTasks(list, "done")).toHaveLength(1);
    expect(JSON.stringify(list)).toBe(snapshot);
    expect(summarize(list)).toEqual({ total: 3, pending: 2, done: 1 });
  });
});

describe("armazenamento local", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("hook carrega as tarefas fornecidas pelo backend", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [{
        id: "1",
        title: "Estudar Matemática",
        status: "pending",
        createdAt: 100,
      }],
    }));

    const { result } = renderHook(() => useTasks());
    await vi.waitFor(() => expect(result.current.loadState).toBe("ready"));
    expect(result.current.tasks[0]?.title).toBe("Estudar Matemática");
  });

  it("hook mostra estado de erro quando o backend está indisponível", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Falha de rede")));

    const { result } = renderHook(() => useTasks());
    await vi.waitFor(() => expect(result.current.loadState).toBe("error"));
  });

  it("hook cria uma tarefa pelo backend", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({
          id: "2",
          title: "Estudar Matemática",
          status: "pending",
          createdAt: 200,
        }),
      });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useTasks());
    await vi.waitFor(() => expect(result.current.loadState).toBe("ready"));
    act(() => {
      result.current.add("Estudar Matemática");
    });
    await vi.waitFor(() => expect(result.current.tasks[0]?.title).toBe("Estudar Matemática"));
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "http://localhost:3000/api/tarefas",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
