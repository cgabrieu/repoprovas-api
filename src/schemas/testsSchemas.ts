import joi from 'joi';

export const createTestSchema = joi.object({
    year: joi.number().integer().min(2015).max((new Date()).getFullYear()).required(),
    semester: joi.number().integer().min(1).max(2).required(),
    type: joi.string().valid('P1', 'P2', 'P3', '2ch', 'PF', 'Outras').required(),
    link: joi.string().uri().required(),
    teacherId: joi.number().integer().min(1).required(),
    classId: joi.number().integer().min(1).required(),
});