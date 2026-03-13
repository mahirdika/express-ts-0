import { Router } from "express";
import { createProduct, deleteProduct, getProducts, putProduct } from "../controllers/product.controller.js";
import { requireUser } from "../middleware/authorization.js";

export const productRouter: Router = Router();

productRouter.get("/", getProducts);
productRouter.get("/:product_id", getProducts);
productRouter.post("/", requireUser, createProduct);
productRouter.put("/:product_id", requireUser, putProduct);
productRouter.delete("/:product_id", requireUser, deleteProduct);