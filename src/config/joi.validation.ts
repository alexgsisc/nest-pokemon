import * as Joi from "joi";


export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3002),
    DEFAUlT_LIMIT: Joi.number().default(9),
})