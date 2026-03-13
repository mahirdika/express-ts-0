import Joi from "joi";
import userType from "../types/user.type.js";

export const registerUserValidation = (payload: userType) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().allow("", null),
  });
  return schema.validate(payload);
};

export const createSessionValidation = (payload: userType) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(payload)
}