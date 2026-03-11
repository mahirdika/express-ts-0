import { Request, Response } from "express";
import { createProductValidation } from "../validations/product.validation.js";
import {
  getProductsFromDB,
  addProductToDB,
  getProductByID,
} from "../services/product.service.js";
import { v4 as uuidv4 } from "uuid";

export const getProducts = async (req: Request, res: Response) => {
  const { parameter } = req.params;
  const product_id = Array.isArray(parameter) ? parameter[0] : parameter;
  if (product_id) {
    const product = await getProductByID(product_id);
    if (product) {
      return res
        .status(201)
        .send({ status: true, statuscode: 201, data: product });
    }
  } else {
    const products = await getProductsFromDB();
    return res
      .status(201)
      .send({ status: true, statuscode: 201, data: products });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4();
  const { error, value } = createProductValidation(req.body);
  if (error) {
    const message = error.details[0]?.message ?? "Validation error";
    return res
      .status(400)
      .send({ status: false, statuscode: 400, message: message });
  }
  try {
    await addProductToDB(value);
    res
      .status(201)
      .send({ status: true, statuscode: 201, message: "Add product success" });
  } catch (error) {
    return res
      .status(422)
      .send({ status: false, statuscode: 422, message: error });
  }
};
