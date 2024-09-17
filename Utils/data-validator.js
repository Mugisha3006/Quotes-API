import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const authorSchema = Joi.object({
    authorName: Joi.string().min(4).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(4).max(10).required(),
    imageUrl: Joi.string()
});

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            res.status(StatusCodes.BAD_REQUEST).json(result.error.details[0].message);
        } else {
            next();
        }
    }
};

export {authorSchema, validate}