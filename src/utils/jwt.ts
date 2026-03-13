import jwt from "jsonwebtoken";
import CONFIG from "../config/environment.js";

export const signJWT = (
  payload: object,
  options?: jwt.SignOptions | undefined,
) => {
  const privateKey = Buffer.from(CONFIG.JWT_PRIVATE as string, "utf-8");

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};
