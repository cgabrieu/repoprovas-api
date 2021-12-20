import joi from 'joi';

export const createClassSchema = joi.object({
    name: joi.string().min(3).required(),
    period: joi.number().integer().min(1).max(10).required(),
    courseId: joi.array().items(joi.number().integer().required()).required(),
});