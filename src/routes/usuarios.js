import { Router } from 'express';

import * as usuarioController from '../controllers/usuariosController.js';

import {
  runValidations,
  idParamValidator,
  textoParamValidator,
  createUsuarioValidators,
  updateUsuarioValidators
} from '../middlewares/validators.js';

const router = Router();

router.get('/', usuarioController.getObtenerTodosLosUsuarios);

router.get('/buscarPorNombre/:nombre', runValidations([textoParamValidator('nombre')]), usuarioController.getBuscarNombre);

router.get('/buscarPorApellido/:apellido', runValidations([textoParamValidator('apellido')]), usuarioController.getBuscarApellido);

router.get('/buscarPorRol/:rol', runValidations([textoParamValidator('rol')]), usuarioController.getBuscarRol);

router.get('/:usuarioId', runValidations([idParamValidator('usuarioId')]), usuarioController.getObtenerPorId);

router.post('/', runValidations(createUsuarioValidators), usuarioController.postCrearUsuario);

router.put('/:usuarioId', runValidations(updateUsuarioValidators), usuarioController.putActualizarUsuario);

router.delete('/:usuarioId', runValidations([idParamValidator('usuarioId')]), usuarioController.deleteEliminarUsuario);

export default router;
