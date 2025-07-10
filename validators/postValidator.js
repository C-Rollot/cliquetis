const Joi = require('joi');

const postSchema = Joi.object({
  pseudo: Joi.string().max(50).allow('', null), // facultatif
  histoire: Joi.string().min(10).required().messages({
    'string.empty' : 'Le récit ne peut pas être vide.',
    'string.min': 'Le récit doit contenir au moins 10 caractères.'
  }),
  allowVideo: Joi.boolean().truthy('on').falsy('off').default(false)
});

module.exports = { postSchema };
