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

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, CONFIG.JWT_PUBLIC)

    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid:false,
      expired:  error.message === 'jwt is expired or not eligible to use',
      decoded: null
    }
  }


}
