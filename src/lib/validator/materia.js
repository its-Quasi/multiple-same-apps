const Joi = require('joi');

const materiaSchema = Joi.object({
  nombre: Joi.string()
    .regex(/^[a-zA-Z0-9\s]+$/)
    .trim()
    .max(50)
    .required()
    .messages({
      'string.base': 'El nombre de la materia debe ser una cadena de texto.',
      'string.empty': 'El nombre de la materia no puede estar vacío.',
      'string.pattern.base': 'El nombre de la materia solo puede contener letras, números y espacios.',
      'string.max': 'El nombre de la materia no puede exceder los {#limit} caracteres.',
      'any.required': 'El nombre de la materia es obligatorio.'
    })
});

module.exports = materiaSchema;
