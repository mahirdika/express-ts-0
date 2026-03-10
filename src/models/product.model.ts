import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
    },

    price: {
      type: Number,
    },

    color: {
      type: String,
    },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model('products', ProductSchema, 'products')

export interface ProductType {
    product_id: String,
    name: String,
    price: Number,
    color: String
} 
