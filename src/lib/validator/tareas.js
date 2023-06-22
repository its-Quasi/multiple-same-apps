const Joi = require('joi');
const pool = require('../../database');

const tareaSchema = Joi.object({
  nombre: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'El nombre de la tarea debe ser una cadena de texto.',
      'string.max': 'El nombre de la tarea no puede tener más de {#limit} caracteres.',
      'any.required': 'El nombre de la tarea es obligatorio.',
    }),
  prioridad: Joi.number()
    .integer()
    .max(99999999999)
    .messages({
      'number.base': 'La prioridad debe ser un número.',
      'number.integer': 'La prioridad debe ser un número entero.',
      'number.max': 'La prioridad no puede ser mayor a {#limit}.',
      'any.required': 'La prioridad es obligatoria.',
    }),
  entrega: Joi.date()
    .required()
    .messages({
      'date.base': 'La fecha de entrega debe ser una fecha válida.',
      'any.required': 'La fecha de entrega es obligatoria.',
    }),
    idEstado: Joi.number()
    .integer()
    .max(99999999999)
    .required()
    .external(async (value) => {
      const rows = await pool.query('SELECT id FROM estado WHERE id = ?', value);
      if (rows.length === 0) {
        throw new Error('El ID de estado no existe en la base de datos.');
      }
    })
    .messages({
      'number.base': 'El ID de estado debe ser un número.',
      'number.integer': 'El ID de estado debe ser un número entero.',
      'number.max': 'El ID de estado no puede ser mayor a {#limit}.',
      'any.required': 'El ID de estado es obligatorio.',
    }),
  idMateria: Joi.number()
    .integer()
    .max(99999999999)
    .required()
    .external(async (value) => {
      const rows = await pool.query('SELECT idMateria FROM materia WHERE idMateria = ?', value);
      if (rows.length === 0) {
        throw new Error('El ID de materia no existe en la base de datos.');
      }
    })
    .messages({
      'number.base': 'El ID de materia debe ser un número.',
      'number.integer': 'El ID de materia debe ser un número entero.',
      'number.max': 'El ID de materia no puede ser mayor a {#limit}.',
      'any.required': 'El ID de materia es obligatorio.',
    }),
});

module.exports = tareaSchema;
