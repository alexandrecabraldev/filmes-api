# API de Filmes (Express + Prisma + SQLite) — Campos em Português

Endpoints base: `http://localhost:3000/api`

## Recursos
- Filmes: CRUD com associação N:N com Atores
- Campos: titulo, faixaEtaria, genero, atores
- Validação com Zod via middleware
- Tratamento de erros centralizado
- IDs gerados com UUID na camada de serviço

## Rotas
- GET `/api/filmes` -> lista filmes
- POST `/api/filmes` -> cria filme
- GET `/api/filmes/:id` -> busca por id
- PUT `/api/filmes/:id` -> atualiza filme
- DELETE `/api/filmes/:id` -> remove filme

### Exemplo de payload (criar)
```json
{
  "titulo": "Matrix",
  "faixaEtaria": "16",
  "genero": "Ficção",
  "atores": [ { "nome": "Keanu Reeves" }, { "nome": "Carrie-Anne Moss" } ]
}
```

### Exemplo de payload (atualizar)
```json
{
  "titulo": "Matrix Reloaded",
  "atorIds": ["uuid-ator-existente-1", "uuid-ator-existente-2"],
  "atores": [ { "nome": "Novo Ator" } ]
}
```

## Como rodar
1. Instalar dependências
2. Gerar Client do Prisma e aplicar migrações
3. Rodar em modo dev

### Comandos
```powershell
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

A API ficará acessível em: http://localhost:3000/api
