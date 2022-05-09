import { ArgsType, Field, InputType } from "type-graphql";

@InputType()
export class AccountArgs {
  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  cover?: string;

  @Field({ nullable: true })
  nickname?: string;
}

@ArgsType()
export class CreateAccountArgs {
  
  @Field()
  chain: string;

  @Field()
  address: string;
}
