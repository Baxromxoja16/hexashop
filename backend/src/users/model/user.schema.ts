import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shopCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'goods' }],
  },
  { timestamps: true },
);

export const UserName = 'users';

export type UserType = {
  _id: string;
  name: string;
  phone: string;
  password: string;
  shopCart: [];
  createdAt: Date;
  updatedAt: Date;
};
