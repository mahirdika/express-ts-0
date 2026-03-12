import userType from "../types/user.type.js";
import userModel from "../models/user.model.js";

export const createUser = async (payload: userType) => {
  return await userModel.create(payload);
};
