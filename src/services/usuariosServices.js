import { pool } from '../db.js';

import bcrypt from 'bcryptjs';

import { httpError } from '../utils/httpError.js';

const COLUMNAS = `u.usuarioId AS "usuarioId", u.rolId AS "rolId", r.rol,
    u.nombreUsuario AS "nombreUsuario", u.nombre, u.apellido`;

const encriptarClave = (clave) => {
    const SALT_ROUNDS = 10;

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    return bcrypt.hashSync(clave, salt);
};

export const getAllUsuarios = async () => {
    const result = await pool.query(`SELECT ${COLUMNAS}
        FROM usuarios u INNER JOIN roles r ON r.rolId = u.rolId
        ORDER BY u.usuarioId`);
    return result.rows;
};

export const getUsuarioById = async (usuarioId) => {
    const result = await pool.query(`SELECT ${COLUMNAS}
        FROM usuarios u INNER JOIN roles r ON r.rolId = u.rolId
        WHERE u.usuarioId = $1`, [usuarioId]);

    if (result.rowCount === 0) throw httpError('Usuario no encontrado', 404);

    return result.rows[0];
};

export const getByNombre = async (nombre) => {
    const buscar = `%${nombre}%`;

    const result = await pool.query(`SELECT ${COLUMNAS}
        FROM usuarios u INNER JOIN roles r ON r.rolId = u.rolId
        WHERE u.nombre ILIKE $1`, [buscar]);

    return result.rows;
};

export const getByApellido = async (apellido) => {
    const buscar = `%${apellido}%`;

    const result = await pool.query(`SELECT ${COLUMNAS}
        FROM usuarios u INNER JOIN roles r ON r.rolId = u.rolId
        WHERE u.apellido ILIKE $1`, [buscar]);

    return result.rows;
};

export const getByRol = async (rol) => {
    const result = await pool.query(`SELECT ${COLUMNAS}
        FROM usuarios u INNER JOIN roles r ON r.rolId = u.rolId
        WHERE r.rol ILIKE $1`, [rol]);

    return result.rows;
};

export const createUsuario = async (rolId, nombreUsuario, clave, nombre, apellido) => {
    const claveHashed = encriptarClave(clave);

    const query = `INSERT INTO usuarios (rolId, nombreUsuario, clave, nombre, apellido)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING usuarioId AS "usuarioId", rolId AS "rolId", nombreUsuario AS "nombreUsuario", nombre, apellido;`;

    const result = await pool.query(query, [rolId, nombreUsuario, claveHashed, nombre, apellido]);

    return result.rows[0];
};

export const updateUsuario = async (usuario) => {
    usuario[2] = encriptarClave(usuario[2]);

    const query = `UPDATE usuarios
        SET rolId=$1,
            nombreUsuario=$2,
            clave=$3,
            nombre=$4,
            apellido=$5
        WHERE usuarioId=$6
        RETURNING usuarioId AS "usuarioId", rolId AS "rolId", nombreUsuario AS "nombreUsuario", nombre, apellido;`;

    const result = await pool.query(query, usuario);

    if (result.rowCount === 0) throw httpError('Usuario no encontrado', 404);

    return result.rows[0];
};

export const deleteUsuario = async (usuarioId) => {
    const usuarioAEliminar = await getUsuarioById(usuarioId);

    await pool.query('DELETE FROM usuarios WHERE usuarioId=$1', [usuarioId]);

    return { message: 'Usuario eliminado correctamente', usuario: usuarioAEliminar };
};
