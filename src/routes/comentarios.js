import { Router } from 'express';

import * as comentarioController from '../controllers/comentariosController.js';

import {
  runValidations,
  idParamValidator,
  createComentarioValidators,
  updateComentarioValidators
} from '../middlewares/validators.js';

const router = Router();

router.get('/', comentarioController.getObtenerTodosLosComentarios);

router.get('/buscarPorPublicacion/:publicacionId', runValidations([idParamValidator('publicacionId')]), comentarioController.getBuscarPublicacion);

router.get('/buscarPorUsuario/:usuarioId', runValidations([idParamValidator('usuarioId')]), comentarioController.getBuscarUsuario);

router.get('/:comentarioId', runValidations([idParamValidator('comentarioId')]), comentarioController.getObtenerPorId);

router.post('/', runValidations(createComentarioValidators), comentarioController.postCrearComentario);

router.put('/:comentarioId', runValidations(updateComentarioValidators), comentarioController.putActualizarComentario);

router.delete('/:comentarioId', runValidations([idParamValidator('comentarioId')]), comentarioController.deleteEliminarComentario);

export default router;
