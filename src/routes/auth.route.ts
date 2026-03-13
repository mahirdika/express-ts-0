import { Router } from "express";
import { createSession, registerUser } from "../controllers/auth.controller.js";
import { requireUser, requireAdmin } from "../middleware/authorization.js";

export const authRouter: Router = Router();

authRouter.post("/register", requireAdmin, registerUser)
authRouter.post("/login", createSession)