import { Application, Router } from "express";
import { landingRouter } from "./landing.router.js";
import { productRouter } from "./product.route.js";
import { authRouter } from "./auth.route.js";

const _routes: Array<[string, Router]> = [
  ["/", landingRouter],
  ["/products", productRouter],
  ["/auth", authRouter]
];

export const routes = (app: Application) => {
  _routes.forEach(([path, router]) => {
    app.use(path, router);
  });
};
