import { request, response } from "express";
import { createProductValidation } from "../validations/product.validation.js";

export const getProducts = (req: typeof request, res: typeof response) => {
    const products = [
        { name: "lemari", price: 1000000 },
        { name: "meja", price: 500000 },
        { name: "kursi", price: 250000 }
    ];

    const { name } = req.params;

    if (name) {
        const product = products.find(p => p.name === name);
        if (product) {
            return res.status(200).send({ statuscode: 200, data: product });
        } else {
            return res.status(404).send({ statuscode: 404, message: "Product not found" });
        }
    }
    return res.status(200).send({ statuscode: 200, data: products });
}

export const createProduct = (req: typeof request, res: typeof response) => {
  const { error, value } = createProductValidation(req.body);
  if (error) {
    const message = error.details[0]?.message ?? "Validation error";
    return res.status(400).send({ statuscode: 400, message: message });
  } 
  res.status(201).send({ statuscode: 201, data: value });
}