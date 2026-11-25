# AulaExemploIA

Projeto centralizado com frontend e backend separados:

```text
frontend/
backend/
```

## Instalar

```powershell
npm run install:all
```

Os projetos continuam com seus próprios `package.json`, dependências e locks.

## Executar

Frontend:

```powershell
npm run dev:frontend
```

Abra o endereço exibido pelo Vite (normalmente `http://localhost:8080`).

Backend:

```powershell
npm run dev:backend
```

A API fica disponível em `http://localhost:3000/api/tarefas`. Durante o
desenvolvimento, o backend aceita as origens locais do Vite nas portas 5173 e
8080. Em produção, configure `CORS_ORIGINS` com a origem do frontend.

Antes de iniciar o backend, copie `backend/.env.example` para `backend/.env` e informe as configurações do PostgreSQL.

## Validar

```powershell
npm run test:frontend
npm run test:backend
npm run build:frontend
```
