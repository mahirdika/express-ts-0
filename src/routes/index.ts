import { type Application, type Router } from "express";
import { landingRouter } from "./landing.router.js";
import { productRouter } from "./product.route.js";

const _routes: Array<[string, Router]> = [
  ["/", landingRouter], ["/product", productRouter]
];

export const routes = (app:Application) => {
  _routes.forEach(([path, router]) => {
    app.use(path, router);
  })};