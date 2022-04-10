import mongoose, { Schema } from "mongoose";
import { IAccount } from "./account";
import { IObjectBase } from "./object-base";

export interface IAsset extends IObjectBase {
  chain: string;
  algorythm: string;
  account: string | IAccount;
}

const AssetSchema = new Schema(
  {
    chain: String,
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    algorythm: String,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: "modifiedAt",
    },
  }
);

export const AssetModel = mongoose.model<IAsset>("Asset", AssetSchema);
