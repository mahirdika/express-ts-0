import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller.js";

export const productRouter: Router = Router();

productRouter.get("/", getProducts);
productRouter.get("/:product_id", getProducts);
productRouter.post("/", createProduct);
