const http = require("node:http");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const PORT = 3000;
const frontendPath = path.join(__dirname, "frontend.html");
const tarefas = [
  { id: 1, titulo: "Estudar API REST", concluida: false },
  { id: 2, titulo: "Criar um exemplo com Node.js", concluida: true },
  { id: 3, titulo: "Consultar tarefas no front-end", concluida: false },
];

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method !== "GET") {
    response.writeHead(405, { Allow: "GET", "Content-Type": "text/plain; charset=utf-8" });
    response.end("Método não permitido. Use GET.");
    return;
  }

  if (url.pathname === "/api/tarefas") {
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(JSON.stringify(tarefas));
    return;
  }

  if (url.pathname === "/") {
    try {
      const html = await readFile(frontendPath);
      response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      });
      response.end(html);
    } catch (error) {
      console.error("Não foi possível carregar frontend.html:", error);
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Erro ao carregar a página.");
    }
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Rota não encontrada.");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor disponível em http://localhost:${PORT}`);
  console.log(`API de tarefas: http://localhost:${PORT}/api/tarefas`);
});
