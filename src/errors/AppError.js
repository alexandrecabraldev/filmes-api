// Erro de aplicação simples: mensagem + código HTTP opcional
export class AppError extends Error {
  constructor(message, status = 400, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
