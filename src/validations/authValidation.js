import Joi from "joi";

const email = Joi.string().email().trim();
const password = Joi.string().alphanum().trim().min(5).max(15);

export const signUpSchema = Joi.object({
    fullName: Joi.string().strict().trim(),
    email,
    password
}).options({ presence: 'required' }).required();

export const loginSchema = Joi.object({
    email,
    password
}).options({ presence: 'required' }).required();