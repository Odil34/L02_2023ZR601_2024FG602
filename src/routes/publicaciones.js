import { Router } from 'express';

import * as publicacionController from '../controllers/publicacionesController.js';

import {
  runValidations,
  idParamValidator,
  topValidators,
  createPublicacionValidators,
  updatePublicacionValidators
} from '../middlewares/validators.js';

const router = Router();

router.get('/', publicacionController.getObtenerTodasLasPublicaciones);

router.get('/buscarPorUsuario/:usuarioId', runValidations([idParamValidator('usuarioId')]), publicacionController.getBuscarUsuario);

router.get('/topComentadas/:n', runValidations(topValidators), publicacionController.getTopComentadas);

router.get('/:publicacionId', runValidations([idParamValidator('publicacionId')]), publicacionController.getObtenerPorId);

router.post('/', runValidations(createPublicacionValidators), publicacionController.postCrearPublicacion);

router.put('/:publicacionId', runValidations(updatePublicacionValidators), publicacionController.putActualizarPublicacion);

router.delete('/:publicacionId', runValidations([idParamValidator('publicacionId')]), publicacionController.deleteEliminarPublicacion);

export default router;
