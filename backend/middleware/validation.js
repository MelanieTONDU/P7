const Joi = require('joi');

function userValidationSchema(body) {
    const userValidation = Joi.object({
        lastName : Joi.string().required(),
        firstName : Joi.string().required(),
        email: Joi.string().email().trim().required(),
        password : Joi.string().required(),
    })
    return userValidation.validate(body);
}

module.exports = userValidationSchema;