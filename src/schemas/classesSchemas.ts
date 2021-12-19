import joi from 'joi';

export const createClassSchema = joi.object({
    name: joi.string().min(3).required(),
    period: joi.number().integer().min(2015).max((new Date()).getFullYear()).required(),
    course: joi.number().integer().min(1).required(),
});