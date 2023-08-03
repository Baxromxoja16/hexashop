import mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const AdminName = 'admins';

export type AdminType = {
  _id: string;
  name: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
