import mongoose, { Schema } from "mongoose";

export interface IAccount {
  nickname: string;
  publicAddress: string;
}

const AccountSchema = new Schema(
  {
    nickname: {
      type: String,
      default: "",
    },
    publicAddress: String,
  },
  { timestamps: true }
);

export const AccountModel = mongoose.model<IAccount>("Account", AccountSchema);
