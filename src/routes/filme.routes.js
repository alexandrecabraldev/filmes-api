import { Router } from 'express';
import { FilmeController } from '../controllers/filme.controller.js';
import { validate, schemas } from '../middlewares/validate.js';

const router = Router();

router.get('/', FilmeController.listar);
router.post('/', validate(schemas.filmeCriar), FilmeController.criar);
router.get('/:id', validate(schemas.idParam), FilmeController.obter);
router.put('/:id', validate(schemas.filmeAtualizar), FilmeController.atualizar);
router.delete('/:id', validate(schemas.idParam), FilmeController.remover);

export default router;