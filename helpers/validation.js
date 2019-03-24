const Joi = require('joi');

const schemas = {
    'office': Joi.object().keys({
       title: Joi.string(),
       website: Joi.string(),
       address: Joi.string()
    }),
    'officeUpd': Joi.object().keys({
        id: Joi.number().positive(),
        title: Joi.string().optional(),
        website: Joi.string().optional(),
        address: Joi.string().optional()
     }),
     'agent': Joi.object().keys({
         name: Joi.string(),
         email: Joi.string().email(),
         tel: Joi.string(),
         officeId: Joi.number().positive()
     }),
     'agentUpd': Joi.object().keys({
        id: Joi.number().positive(), 
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        tel: Joi.string().optional(),
        officeId: Joi.number().positive().optional()
    }),
    'property': Joi.object().keys({
        heading: Joi.string(),
        price: Joi.number().positive(),
        currency: Joi.string().regex(/(?:BYN|USD|EUR)/),
        location: Joi.string(),
        agentId: Joi.number().positive()
    }),
    'propertyUpd': Joi.object().keys({
        id: Joi.number().positive(),
        heading: Joi.string().optional(),
        price: Joi.number().positive().optional(),
        currency: Joi.string().regex(/(?:BYN|USD|EUR)/).optional(),
        location: Joi.string().optional(),
        agentId: Joi.number().positive().optional()
    })
}

exports.check = function (schema, body) {
    if(!schemas[schema])
        return {};
    return Joi.validate(body, schemas[schema], {presence: 'required'});
}