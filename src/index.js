import express from 'express';

import usuariosRouter from './routes/usuarios.js';
import publicacionesRouter from './routes/publicaciones.js';
import comentariosRouter from './routes/comentarios.js';

import { errorHandler, notFound } from './middlewares/errorHandler.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo UNICAES! La API de blogDB está funcionando correctamente.');
});

app.use('/usuarios', usuariosRouter);
app.use('/publicaciones', publicacionesRouter);
app.use('/comentarios', comentariosRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});
