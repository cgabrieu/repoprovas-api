import joi from 'joi';

export const exampleSchema = joi.object({
    attribute: joi.string().min(5).required(),
});