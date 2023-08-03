import mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  refreshToken: { type: String, required: true },
});

export const AuthName = 'tokens';

export type AuthType = {
  _id: string;
  userId: string;
  refreshToken: string;
};
