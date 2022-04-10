import mongoose, { Schema } from "mongoose";
import { IAccount } from "./account";
import { IObjectBase } from "./object-base";

export interface ICollection extends IObjectBase {
  name: string;
  description: string;
  account: string | IAccount;
}

const CollectionSchema = new Schema(
  {
    name: String,
    description: String,
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  }
);

export const CollectionModel = mongoose.model<ICollection>(
  "Collection",
  CollectionSchema
);
