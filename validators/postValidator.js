const Joi = require('joi');

const postSchema = Joi.object({
  pseudo: Joi.string().max(50).allow('', null), // facultatif
  histoire: Joi.string().min(10).required(),
  allowVideo: Joi.boolean().truthy('on').falsy('off').default(false)
});

module.exports = { postSchema };
