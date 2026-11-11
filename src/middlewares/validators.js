import { body, param, validationResult } from 'express-validator';

export const runValidations = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      status: 'error',
      errors: errors.array()
    });
  };
};

export const idParamValidator = (campo) =>
  param(campo)
    .isInt({ min: 1 })
    .withMessage(`El parámetro ${campo} debe ser un número entero positivo`);

export const textoParamValidator = (campo) =>
  param(campo)
    .trim()
    .notEmpty()
    .withMessage(`El parámetro ${campo} es obligatorio`);

export const createUsuarioValidators = [
  body('rolId')
    .isInt({ min: 1 })
    .withMessage('El rolId debe ser un número entero positivo'),

  body('nombreUsuario')
    .trim()
    .notEmpty()
    .withMessage('El nombreUsuario es obligatorio'),

  body('clave')
    .isLength({ min: 6 })
    .withMessage('La clave debe tener al menos 6 caracteres'),

  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

  body('apellido')
    .trim()
    .notEmpty()
    .withMessage('El apellido es obligatorio')
];

export const updateUsuarioValidators = [
  idParamValidator('usuarioId'),
  ...createUsuarioValidators
];

export const createPublicacionValidators = [
  body('titulo')
    .trim()
    .notEmpty()
    .withMessage('El titulo es obligatorio'),

  body('descripcion')
    .trim()
    .notEmpty()
    .withMessage('La descripcion es obligatoria'),

  body('usuarioId')
    .isInt({ min: 1 })
    .withMessage('El usuarioId debe ser un número entero positivo')
];

export const updatePublicacionValidators = [
  idParamValidator('publicacionId'),
  ...createPublicacionValidators
];

export const topValidators = [
  param('n')
    .isInt({ min: 1, max: 100 })
    .withMessage('N debe ser un número entero entre 1 y 100')
];

export const createComentarioValidators = [
  body('publicacionId')
    .isInt({ min: 1 })
    .withMessage('El publicacionId debe ser un número entero positivo'),

  body('comentario')
    .trim()
    .notEmpty()
    .withMessage('El comentario es obligatorio'),

  body('usuarioId')
    .isInt({ min: 1 })
    .withMessage('El usuarioId debe ser un número entero positivo')
];

export const updateComentarioValidators = [
  idParamValidator('comentarioId'),
  ...createComentarioValidators
];
