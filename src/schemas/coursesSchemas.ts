import joi from 'joi';

export const createCourseSchema = joi.object({
    attribute: joi.string().min(3).required(),
});