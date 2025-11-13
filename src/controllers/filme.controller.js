import { FilmeService } from '../services/filme.service.js';

export const FilmeController = {

  async criar(req, res, next) {
    try {
      const filme = await FilmeService.criar(req.validated.body);
      res.status(201).json(filme);
    } catch (e) { 
        next(e); 
    }
  },

  async listar(_req, res, next) {
    try { 
        res.json(await FilmeService.listar()); 
    }
    catch (e) { 
        next(e); 
    }
  },

  async obter(req, res, next) {
    try { 
        res.json(await FilmeService.obter(req.validated.params.id)); 
    }
    catch (e) { 
        next(e); 
    }
  },

  async atualizar(req, res, next) {
    try {
      const { id } = req.validated.params;
      res.json(await FilmeService.atualizar(id, req.validated.body));
    } catch (e) { 
        next(e); 
    }
  },

  async remover(req, res, next) {
    try { 
        res.json(await FilmeService.remover(req.validated.params.id)); 
    }
    catch (e) { 
        next(e); 
    }
  },
};
