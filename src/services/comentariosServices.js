import { pool } from '../db.js';

import { httpError } from '../utils/httpError.js';

const COLUMNAS = `comentarioId AS "comentarioId", publicacionId AS "publicacionId", comentario, usuarioId AS "usuarioId"`;

export const getAllComentarios = async () => {
    const result = await pool.query(`SELECT ${COLUMNAS} FROM comentarios ORDER BY comentarioId`);
    return result.rows;
};

export const getComentarioById = async (comentarioId) => {
    const result = await pool.query(`SELECT ${COLUMNAS} FROM comentarios WHERE comentarioId = $1`, [comentarioId]);

    if (result.rowCount === 0) throw httpError('Comentario no encontrado', 404);

    return result.rows[0];
};

export const getByPublicacion = async (publicacionId) => {
    const result = await pool.query(`SELECT ${COLUMNAS} FROM comentarios WHERE publicacionId = $1`, [publicacionId]);
    return result.rows;
};

export const getByUsuario = async (usuarioId) => {
    const result = await pool.query(`SELECT ${COLUMNAS} FROM comentarios WHERE usuarioId = $1`, [usuarioId]);
    return result.rows;
};

export const createComentario = async (publicacionId, comentario, usuarioId) => {
    const query = `INSERT INTO comentarios (publicacionId, comentario, usuarioId)
        VALUES ($1, $2, $3)
        RETURNING ${COLUMNAS};`;

    const result = await pool.query(query, [publicacionId, comentario, usuarioId]);

    return result.rows[0];
};

export const updateComentario = async (comentarioDatos) => {
    const query = `UPDATE comentarios
        SET publicacionId=$1,
            comentario=$2,
            usuarioId=$3
        WHERE comentarioId=$4
        RETURNING ${COLUMNAS};`;

    const result = await pool.query(query, comentarioDatos);

    if (result.rowCount === 0) throw httpError('Comentario no encontrado', 404);

    return result.rows[0];
};

export const deleteComentario = async (comentarioId) => {
    const comentarioAEliminar = await getComentarioById(comentarioId);

    await pool.query('DELETE FROM comentarios WHERE comentarioId=$1', [comentarioId]);

    return { message: 'Comentario eliminado correctamente', comentario: comentarioAEliminar };
};
