import type { Request, Response } from "express";
import { createProductValidation } from "../validations/product.validation.js";
import { getProductsFromDB } from "../services/product.service.js";
import type { ProductType } from "../models/product.model.js";

export const getProducts = async (req: Request, res: Response) => {
    const products: any = await getProductsFromDB()

    const { name } = req.params;

    if (name) {
        const product = products.find((p: ProductType) => p.name === name);
        if (product) {
            return res.status(200).send({ statuscode: 200, data: product });
        } else {
            return res.status(404).send({ statuscode: 404, message: "Product not found" });
        }
    }
    return res.status(200).send({ statuscode: 200, data: products });
}

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body);
  if (error) {
    const message = error.details[0]?.message ?? "Validation error";
    return res.status(400).send({ statuscode: 400, message: message });
  } 
  res.status(201).send({ statuscode: 201, data: value });
}