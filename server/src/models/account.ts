import mongoose, { Schema } from "mongoose";
import { IObjectBase } from "./object-base";

export interface IAccount extends IObjectBase {
  cover: string;
  avatar: string;
  nickname: string;
  addresses: string[];
  description: string;
}

const AccountSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
    nickname: {
      type: String,
      default: "unnamed",
    },
    description: {
      type: String,
      default: "",
    },
    addresses: [String],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  }
);

export const AccountModel = mongoose.model<IAccount>("Account", AccountSchema);
