import ProductModel from "../models/product.model.js";
import ProductType from "../types/product.type.js";

export const getProductsFromDB = async () => {
  return await ProductModel.find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProductByID = async (product_id: String) => {
  return await ProductModel.findOne(product_id)
}

export const addProductToDB = async (payload: ProductType) => {
  return await ProductModel.create(payload)
}
