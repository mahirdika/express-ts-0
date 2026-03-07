import { Router } from "express";

export const productRouter: Router = Router();

productRouter.get("/", (req, res) => {
  res
    .status(200)
    .send({ statuscode: 200, data: { name: "lemari", price: 1000000 } });
});
