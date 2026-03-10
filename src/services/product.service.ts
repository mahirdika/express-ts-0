import { ProductModel } from "../models/product.model.js";

export const getProductsFromDB = async () => {
  return await ProductModel.find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
