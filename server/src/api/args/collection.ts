import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CollectionArgs {
  @Field()
  name: string;

  @Field()
  description: string;
}
