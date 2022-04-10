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
import { ObjectBase } from "../models/object-base";

@ObjectType()
export class Category extends ObjectBase {
  @Field()
  name: string;
}

@Resolver(Category)
export default class CategoryResolver {
  @Query((r) => [Category])
  async getCategories(): Promise<Category[]> {
    return [];
  }
}
