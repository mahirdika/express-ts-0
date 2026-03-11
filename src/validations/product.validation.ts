import Joi from "joi";
import ProductType from "../types/product.type.js";

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow("", null),
    color: Joi.string().allow("", null),
  });
  return schema.validate(payload);
};
