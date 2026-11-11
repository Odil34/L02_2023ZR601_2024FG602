const erroresPostgres = {
  '23505': { statusCode: 409, message: 'Ya existe un registro con ese valor (dato duplicado)' },
  '23503': { statusCode: 400, message: 'El registro relacionado no existe' },
  '23502': { statusCode: 400, message: 'Falta un campo obligatorio' },
  '22P02': { statusCode: 400, message: 'Formato de dato inválido' },
  '22001': { statusCode: 400, message: 'El valor excede la longitud permitida' },
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const errorPostgres = erroresPostgres[err.code];
  if (errorPostgres) {
    err.statusCode = errorPostgres.statusCode;
    err.message = errorPostgres.message;
  }

  if (err.type === 'entity.parse.failed') {
    err.message = 'El cuerpo de la petición no es un JSON válido';
  }

  const statusCode = err.statusCode || err.status || 500;

  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    status: 'error',
    message
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
};
