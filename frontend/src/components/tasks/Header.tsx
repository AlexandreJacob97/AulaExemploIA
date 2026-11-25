import { HardDrive } from "lucide-react";

function PotatoMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 text-primary">
      <path
        fill="currentColor"
        d="M6.5 11.8C8.4 6.6 14.6 4 20.2 5.4c5.7 1.4 8.6 6.6 7.1 12.3-1.6 6-7.8 9.7-14 8.6C7 25.2 4.6 17 6.5 11.8Z"
      />
      <g className="fill-primary-foreground" opacity="0.75">
        <circle cx="12.5" cy="13" r="1.1" />
        <circle cx="19.5" cy="10.5" r="0.9" />
        <circle cx="20" cy="18.5" r="1.2" />
        <circle cx="13.5" cy="20.5" r="0.8" />
      </g>
    </svg>
  );
}

export function Header() {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-sm font-semibold text-primary">
          <PotatoMark />
          ListaBatata
        </p>
        <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
          Minha Lista de Tarefas
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Organize suas atividades e acompanhe seu progresso.
        </p>
      </div>
      <div
        className="inline-flex max-w-full items-start gap-2 self-start rounded-lg border border-border bg-secondary px-3 py-2 text-secondary-foreground sm:self-auto"
        role="note"
        aria-label="Sobre o armazenamento dos dados"
      >
        <HardDrive className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="text-xs leading-snug">
          <span className="block font-semibold">Salvo localmente neste navegador</span>
          <span className="block text-muted-foreground">Dados demonstrativos, sem conta ou servidor</span>
        </span>
      </div>
    </header>
  );
}
