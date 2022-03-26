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
import { IAccount } from "../models/account";
import { AccountModel } from "../models/account";

@ObjectType()
export class Account implements IAccount {
  @Field()
  nickname: string;

  @Field()
  publicAddress: string;
}

@Resolver(Account)
export default class AccountResolver {
  @Query((r) => Account)
  async getAccountByAddress(
    @Arg("address") publicAddress: String
  ): Promise<Account> {
    const account = await AccountModel.findOne({ publicAddress });

    if (account) {
      return account;
    }

    const newAccount = await AccountModel.create({
      publicAddress,
    });

    return newAccount;
  }
}
