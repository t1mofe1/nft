import mongoose, { Schema } from "mongoose";
import { IObjectBase } from "./object-base";

export interface IAccount extends IObjectBase {
  cover: string;
  avatar: string;
  nickname: string;
  addresses: Array<{
    chain: string;
    address: string;
  }>;
  description: string;
}

const AddressSchema = new Schema({
  chain: String,
  address: String,
  isDefault: {
    type: String,
    default: false
  }
}, { 
  _id: false 
})

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
    addresses: [AddressSchema],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  }
);

export const AccountModel = mongoose.model<IAccount>("Account", AccountSchema);
