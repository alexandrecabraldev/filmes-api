import { z } from 'zod';
import { AppError } from '../errors/AppError.js';

// Middleware de validação simples com Zod
export function validate(schema) {
  return (req, _res, next) => {

    const data = { body: req.body, params: req.params, query: req.query };
    const parsed = schema.safeParse(data);

    if (!parsed.success) {

      const details = parsed.error.issues;
      return next(new AppError('Dados inválidos', 422, details));
    }
    
    req.validated = parsed.data; // coloca dados validados no req
    next();
  };
}

// Esquemas de validação
const atorEntrada = z.object({ 
        id: z.string().uuid().optional(), 
        nome: z.string().min(1) 
    });

export const schemas = {
  filmeCriar: z.object({
    body: z.object({
      id: z.string().uuid().optional(),
      titulo: z.string().min(1),
      faixaEtaria: z.string().min(1),
      genero: z.string().min(1),
      atores: z.array(atorEntrada).optional(),
      atorIds: z.array(z.string().uuid()).optional(),
    }),
    params: z.object({}),
  }),

  filmeAtualizar: z.object({
    body: z.object({
      titulo: z.string().min(1).optional(),
      faixaEtaria: z.string().min(1).optional(),
      genero: z.string().min(1).optional(),
      atores: z.array(atorEntrada).optional(),
      atorIds: z.array(z.string().uuid()).optional(),
    }),
    params: z.object({ 
        id: z.string().uuid() 
    }),
  }),

  idParam: z.object({
    body: z.object({}),
    params: z.object({ 
        id: z.string().uuid() 
    }),
  }),
};
