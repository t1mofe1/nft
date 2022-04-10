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

export interface IObjectBase {
  _id: string;
  createdAt: string;
  modifiedAt: string;
}

@ObjectType()
export class ObjectBase implements IObjectBase {
  @Field({ name: "id" })
  _id: string;

  @Field()
  createdAt: string;

  @Field()
  modifiedAt: string;
}
