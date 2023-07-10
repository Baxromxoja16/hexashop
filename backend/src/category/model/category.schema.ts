import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, requred: true, unique: true },
  subCategories: [
    {
      category: { type: String, required: true },
    },
  ],
});

export const CategoryName = 'categories';

export type CategoryType = {
  _id: string;
  name: string;
  img: string;
  subCategories: { category: string; name: string }[];
};
