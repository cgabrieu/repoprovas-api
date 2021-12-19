import joi from 'joi';

export const createTeacherSchema = joi.object({
    name: joi.string().min(3).required(),
    courseId: joi.array().items(joi.number().integer().required()).required(),
});