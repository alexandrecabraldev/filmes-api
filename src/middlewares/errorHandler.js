import { AppError } from '../errors/AppError.js';

// Middleware final de erros
export function errorHandler(err, req, res, next) {

  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }

  console.error('Erro inesperado:', err);
  return res.status(500).json({ error: 'Erro interno do Servidor' });
}
