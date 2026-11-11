import * as comentarioService from '../services/comentariosServices.js';

export const getObtenerTodosLosComentarios = async (req, res, next) => {
  try {
    const result = await comentarioService.getAllComentarios();

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getObtenerPorId = async (req, res, next) => {
  try {
    const { comentarioId } = req.params;

    const result = await comentarioService.getComentarioById(comentarioId);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getBuscarPublicacion = async (req, res, next) => {
  try {
    const { publicacionId } = req.params;

    const result = await comentarioService.getByPublicacion(publicacionId);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getBuscarUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;

    const result = await comentarioService.getByUsuario(usuarioId);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const postCrearComentario = async (req, res, next) => {
  try {
    const { publicacionId, comentario, usuarioId } = req.body;

    const newComentario = await comentarioService.createComentario(publicacionId, comentario, usuarioId);

    res.status(201).json(newComentario);
  } catch (err) {
    return next(err);
  }
};

export const putActualizarComentario = async (req, res, next) => {
  try {
    const { publicacionId, comentario, usuarioId } = req.body;

    const { comentarioId } = req.params;

    const comentarioDatos = [publicacionId, comentario, usuarioId, comentarioId];

    const updatedComentario = await comentarioService.updateComentario(comentarioDatos);

    res.status(200).json(updatedComentario);
  } catch (err) {
    return next(err);
  }
};

export const deleteEliminarComentario = async (req, res, next) => {
  try {
    const { comentarioId } = req.params;

    const result = await comentarioService.deleteComentario(comentarioId);

    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
