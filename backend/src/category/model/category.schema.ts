import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, requred: true },
  }
);

export const CategoryName = 'categories';

export type CategoryType = {
  _id: string;
  name: string;
  img: string;
};
