import { pool } from '../db.js';

import { httpError } from '../utils/httpError.js';

const COLUMNAS = `publicacionId AS "publicacionId", titulo, descripcion, usuarioId AS "usuarioId"`;

export const getAllPublicaciones = async () => {
    const result = await pool.query(`SELECT ${COLUMNAS} FROM publicaciones ORDER BY publicacionId`);
    return result.rows;
};

export const getPublicacionById = async (publicacionId) => {
    const result = await pool.query(`SELECT ${COLUMNAS} FROM publicaciones WHERE publicacionId = $1`, [publicacionId]);

    if (result.rowCount === 0) throw httpError('Publicación no encontrada', 404);

    return result.rows[0];
};

export const getByUsuario = async (usuarioId) => {
    const result = await pool.query(`SELECT ${COLUMNAS} FROM publicaciones WHERE usuarioId = $1`, [usuarioId]);
    return result.rows;
};

export const getTopComentadas = async (n) => {
    const query = `SELECT p.publicacionId AS "publicacionId",
            p.titulo,
            p.descripcion,
            p.usuarioId AS "usuarioId",
            COUNT(c.comentarioId)::int AS "cantidadComentarios"
        FROM publicaciones p
        LEFT JOIN comentarios c ON c.publicacionId = p.publicacionId
        GROUP BY p.publicacionId
        ORDER BY "cantidadComentarios" DESC
        LIMIT $1;`;

    const result = await pool.query(query, [n]);
    return result.rows;
};

export const createPublicacion = async (titulo, descripcion, usuarioId) => {
    const query = `INSERT INTO publicaciones (titulo, descripcion, usuarioId)
        VALUES ($1, $2, $3)
        RETURNING ${COLUMNAS};`;

    const result = await pool.query(query, [titulo, descripcion, usuarioId]);

    return result.rows[0];
};

export const updatePublicacion = async (publicacion) => {
    const query = `UPDATE publicaciones
        SET titulo=$1,
            descripcion=$2,
            usuarioId=$3
        WHERE publicacionId=$4
        RETURNING ${COLUMNAS};`;

    const result = await pool.query(query, publicacion);

    if (result.rowCount === 0) throw httpError('Publicación no encontrada', 404);

    return result.rows[0];
};

export const deletePublicacion = async (publicacionId) => {
    const publicacionAEliminar = await getPublicacionById(publicacionId);

    await pool.query('DELETE FROM publicaciones WHERE publicacionId=$1', [publicacionId]);

    return { message: 'Publicación eliminada correctamente', publicacion: publicacionAEliminar };
};
