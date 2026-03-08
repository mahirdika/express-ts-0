import { Router } from "express";
import Joi from "joi";
import { createProductValidation } from "../validation/product.validation.js";

export const productRouter: Router = Router();

productRouter.get("/", (req, res) => {
  res
    .status(200)
    .send({ statuscode: 200, data: { name: "lemari", price: 1000000 } });
});

productRouter.post("/", (req, res) => {
  const { error, value } = createProductValidation(req.body);
  if (error) {
    const message = error.details[0]?.message ?? "Validation error";
    return res.status(400).send({ statuscode: 400, message: message });
  } 
  res.status(201).send({ statuscode: 201, data: req.body });
});
