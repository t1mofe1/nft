import {
  Ctx,
  Arg,
  Args,
  Query,
  Mutation,
  Resolver,
  InputType,
  Field,
  ArgsType,
  ObjectType,
} from "type-graphql";
import { AssetArgs } from "./args/asset";
import Response from "../utils/graphql/response";
import { ObjectBase } from "../models/object-base";
import { InvokeMutation } from "../utils/graphql/mutation";

@ObjectType()
export class Asset extends ObjectBase {
  @Field({ name: "id" })
  _id: string;

  @Field()
  name: string;

  @Field()
  createdAt: string;

  @Field()
  modifiedAt: string;
}

@Resolver(Asset)
export default class AssetResolver {
  @Query((r) => [Asset])
  async getAssets(): Promise<Asset[]> {
    return [];
  }

  @Query((r) => [Asset])
  async getAssetsByAccount(@Arg("id") id: string): Promise<Asset[]> {
    return [];
  }

  @Query((r) => [Asset])
  async getAssetsByCategory(@Arg("id") id: string): Promise<Asset[]> {
    return [];
  }

  @Query((r) => [Asset])
  async getAssetsByCollection(@Arg("id") id: string): Promise<Asset[]> {
    return [];
  }

  @Mutation((r) => Response)
  async createAsset(@Args() args: AssetArgs): Promise<Response> {
    return InvokeMutation(async () => {});
  }

  @Mutation((r) => Response)
  async updateAsset(
    @Arg("id") id: string,
    @Args() args: AssetArgs
  ): Promise<Response> {
    return InvokeMutation(async () => {});
  }

  @Mutation((r) => Response)
  async deleteAsset(@Args() args: AssetArgs): Promise<Response> {
    return InvokeMutation(async () => {});
  }
}
