import { Router } from "express";

export const landingRouter: Router = Router();

landingRouter.get("/", (req, res) => {
  res.status(200).send("Welcome to the API!");
});
