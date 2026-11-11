import * as usuarioService from '../services/usuariosServices.js';

export const getObtenerTodosLosUsuarios = async (req, res, next) => {
  try {
    const result = await usuarioService.getAllUsuarios();

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getObtenerPorId = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;

    const result = await usuarioService.getUsuarioById(usuarioId);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getBuscarNombre = async (req, res, next) => {
  try {
    const { nombre } = req.params;

    const result = await usuarioService.getByNombre(nombre);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getBuscarApellido = async (req, res, next) => {
  try {
    const { apellido } = req.params;

    const result = await usuarioService.getByApellido(apellido);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getBuscarRol = async (req, res, next) => {
  try {
    const { rol } = req.params;

    const result = await usuarioService.getByRol(rol);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const postCrearUsuario = async (req, res, next) => {
  try {
    const { rolId, nombreUsuario, clave, nombre, apellido } = req.body;

    const newUsuario = await usuarioService.createUsuario(rolId, nombreUsuario, clave, nombre, apellido);

    res.status(201).json(newUsuario);
  } catch (err) {
    return next(err);
  }
};

export const putActualizarUsuario = async (req, res, next) => {
  try {
    const { rolId, nombreUsuario, clave, nombre, apellido } = req.body;

    const { usuarioId } = req.params;

    const usuario = [rolId, nombreUsuario, clave, nombre, apellido, usuarioId];

    const updatedUsuario = await usuarioService.updateUsuario(usuario);

    res.status(200).json(updatedUsuario);
  } catch (err) {
    return next(err);
  }
};

export const deleteEliminarUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;

    const result = await usuarioService.deleteUsuario(usuarioId);

    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
