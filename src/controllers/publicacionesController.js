import * as publicacionService from '../services/publicacionesServices.js';

export const getObtenerTodasLasPublicaciones = async (req, res, next) => {
  try {
    const result = await publicacionService.getAllPublicaciones();

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getObtenerPorId = async (req, res, next) => {
  try {
    const { publicacionId } = req.params;

    const result = await publicacionService.getPublicacionById(publicacionId);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getBuscarUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;

    const result = await publicacionService.getByUsuario(usuarioId);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const getTopComentadas = async (req, res, next) => {
  try {
    const { n } = req.params;

    const result = await publicacionService.getTopComentadas(n);

    res.json(result);
  } catch (err) {
    return next(err);
  }
};

export const postCrearPublicacion = async (req, res, next) => {
  try {
    const { titulo, descripcion, usuarioId } = req.body;

    const newPublicacion = await publicacionService.createPublicacion(titulo, descripcion, usuarioId);

    res.status(201).json(newPublicacion);
  } catch (err) {
    return next(err);
  }
};

export const putActualizarPublicacion = async (req, res, next) => {
  try {
    const { titulo, descripcion, usuarioId } = req.body;

    const { publicacionId } = req.params;

    const publicacion = [titulo, descripcion, usuarioId, publicacionId];

    const updatedPublicacion = await publicacionService.updatePublicacion(publicacion);

    res.status(200).json(updatedPublicacion);
  } catch (err) {
    return next(err);
  }
};

export const deleteEliminarPublicacion = async (req, res, next) => {
  try {
    const { publicacionId } = req.params;

    const result = await publicacionService.deletePublicacion(publicacionId);

    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
