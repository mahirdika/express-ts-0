import { Router } from "express";
import { createProduct, deleteProduct, getProducts, putProduct } from "../controllers/product.controller.js";

export const productRouter: Router = Router();

productRouter.get("/", getProducts);
productRouter.get("/:product_id", getProducts);
productRouter.post("/", createProduct);
productRouter.put("/:product_id", putProduct);
productRouter.delete("/:product_id", deleteProduct);
