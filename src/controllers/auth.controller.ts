import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { checkPassword, hashing } from "../utils/hashing.js";
import {
  createSessionValidation,
  registerUserValidation
} from "../validations/auth.validation.js";
import { createUser, findUserByUsername } from "../services/auth.service.js";
import { signJWT} from "../utils/jwt.js";

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

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body);

  if (error) {
    const message = error.details[0]?.message as string;
    return res
      .status(400)
      .send({ status: false, statuscode: 400, message: message });
  }

  try {
    // bisa juga ganti tipe user menjadi any sementara, untuk mempermudah
    const user = await findUserByUsername(value.username);
    if (!user || !user.password) {
      return res.status(404).send({
        status: false,
        statuscode: 422,
        message: "Akun tidak valid atau belum terdaftar",
      });
    }
    const isValid = checkPassword(value.password, user.password);
    if (!isValid) {
      return res.status(404).send({
        status: false,
        statuscode: 404,
        message: "Password kamu salah",
      });
    }
    let accessToken;
    try {
      accessToken = signJWT({ ...user }, { expiresIn: "1h" });
    } catch (jwtError) {
      console.error("JWT Error:", jwtError); // lihat pesan errornya
      return res.status(500).send({ message: "JWT signing failed" });
    }
    res.status(200).send({
      status: true,
      statuscode: 200,
      message: "Login Success",
      data: { accessToken},
    });
  } catch (jwtError) {
    return res
      .status(422)
      .send({ status: false, statuscode: 422, message: jwtError });
  }
};