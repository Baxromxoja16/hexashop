import mongoose from 'mongoose';

export const GoodsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrls: [{ type: String, required: true }],
    availableAmount: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    rating: { type: Number, default: 5, max: 10 },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const GoodsName = 'goods';

export type GoodsType = {
  _id: string;
  name: string;
  imageUrls: string[];
  availableAmount: number;
  sold: number;
  price: number;
  category: string;
  rating: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
