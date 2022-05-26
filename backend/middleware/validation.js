const Joi = require('joi');

function userValidationSchema(body) {
    const userValidation = Joi.object({
        email: Joi.string().email().trim().required(),
        password : Joi.string().required(),
    })
    return userValidation.validate(body);
}

module.exports = userValidationSchema;