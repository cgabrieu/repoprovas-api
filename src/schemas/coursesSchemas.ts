import joi from 'joi';

export const createCourseSchema = joi.object({
    name: joi.string().min(3).required(),
});