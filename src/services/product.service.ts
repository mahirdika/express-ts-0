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

export const getProductByID = async (product_id: string) => {
  const result = await ProductModel.findOne({ product_id });
  return result;
};

export const addProductToDB = async (payload: ProductType) => {
  return await ProductModel.create(payload);
};

export const updateProductByID = async (
  product_id: string,
  payload: ProductType,
) => {
  const result = await ProductModel.findOneAndUpdate(
    { product_id: product_id },
    { $set: payload },
  );
  return result;
};

export const deleteProductByID = async (product_id: String) => {
  const result = await ProductModel.findOneAndDelete({ product_id });
  return result;
};
