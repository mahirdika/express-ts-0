import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import hashing from "../utils/hashing.js";
import { registerUserValidation } from "../validations/auth.validation.js";
import { createUser } from "../services/auth.service.js";

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4();
  const { error, value } = registerUserValidation(req.body);

  if (error) {
    const message = error.details[0]?.message as string;
    return res
      .status(400)
      .send({ status: false, statuscode: 400, message: message });
  }

  try {
    value.password = `${hashing(value.password)}`;
    await createUser(value);
    res.status(201).send({
      status: true,
      statuscode: 201,
      message: "User registration successfull",
    });
  } catch (error) {
    return res
      .status(422)
      .send({ status: false, statuscode: 422, message: error });
  }
};
