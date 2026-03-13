import { Request, Response } from "express";
import {
  createProductValidation,
  updateProductValidation,
} from "../validations/product.validation.js";
import {
  getProductsFromDB,
  addProductToDB,
  getProductByID,
  updateProductByID,
  deleteProductByID,
} from "../services/product.service.js";
import { v4 as uuidv4 } from "uuid";

export const getProducts = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const id = product_id as string;
  if (product_id) {
    const product = await getProductByID(id);
    if (!product) {
      return res
        .status(404)
        .send({ status: false, statuscode: 404, message: "product not found" });
    }
    return res
      .status(201)
      .send({ status: true, statuscode: 201, data: product });
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
    const message = error.details[0]?.message as string;
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

export const putProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const id = product_id as string;

  const { error, value } = updateProductValidation(req.body);
  if (error) {
    const message = error.details[0]?.message as string;
    return res
      .status(400)
      .send({ status: false, statuscode: 400, message: message });
  }

  try {
    const result = await updateProductByID(id, value);
    if (result) {
      return res.status(200).send({
        status: true,
        statuscode: 200,
        message: "Update product success",
      });
    } else {
      return res
        .status(404)
        .send({ status: false, statuscode: 404, message: "Product not found" });
    }
  } catch (error) {
    return res
      .status(422)
      .send({ status: false, statuscode: 422, message: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const id = product_id as string;

  try {
    const result = await deleteProductByID(id);
    if (!result) {
      console.log("not found");
      return res
        .status(404)
        .send({ status: false, statuscode: 404, message: "Product not found" });
    } else {
      console.log("success");
      return res.status(200).send({
        status: true,
        statuscode: 200,
        message: "Delete product success",
      });
    }
  } catch (error) {
    console.log("catch error");
    return res
      .status(422)
      .send({ status: false, statuscode: 422, message: error });
  }
};
