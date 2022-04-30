import mongoose, { Schema } from "mongoose";
import { IObjectBase } from "./object-base";

export interface IAddress extends IObjectBase {
  chain: String;
}

const AddressSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    chain: String,
  },
  {
    _id: false,
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  }
);

export const AddressModel = mongoose.model<IAddress>("Address", AddressSchema);
