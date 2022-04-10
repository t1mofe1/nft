import uuid from "uuid";
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
import { AccountModel } from "../models/account";
import { ObjectBase } from "../models/object-base";
import { InvokeMutation } from "../utils/graphql/mutation";
import { AccountArgs, CreateAccountArgs } from "./args/account";

import Response from "../utils/graphql/response";

@ObjectType()
export class Account extends ObjectBase {
  @Field()
  avatar: string;

  @Field()
  cover: string;

  @Field()
  nickname: string;

  @Field((t) => [String])
  addresses: string[];
}

@Resolver(Account)
export default class AccountResolver {
  @Query((r) => String)
  getNonce(): String {
    return uuid.v4().toString();
  }

  @Query((r) => Account)
  async getAccount(@Arg("id") id: String): Promise<Account> {
    const account = await AccountModel.findById(id);

    if (!account) {
      throw new Error(
        `There is no account associated with provided id "${id}"`
      );
    }

    return account;
  }

  @Query((r) => Account)
  async getAccountByKey(@Arg("key") key: String): Promise<Account> {
    const account = await AccountModel.findOne({
      $or: [{ _id: { $eq: key } }, { nickname: { $eq: key } }],
    });

    if (!account) {
      throw new Error(
        `There is no account associated with provided key "${key}"`
      );
    }

    return account;
  }

  @Query((r) => Account)
  async getAccountByAddress(@Arg("address") address: String): Promise<Account> {
    const account = await AccountModel.findOne({ addresses: { $in: address } });

    if (account) {
      return account;
    }

    const newAccount = await AccountModel.create({
      addresses: [address],
    });

    return newAccount;
  }

  @Mutation((r) => Response)
  async createAccount(@Args() args: CreateAccountArgs): Promise<Response> {
    return InvokeMutation(async () => {});
  }

  @Mutation((r) => Response)
  async updateAccount(
    @Arg("id") id: string,
    @Arg("args", (t) => AccountArgs) args: AccountArgs
  ): Promise<Response> {
    return InvokeMutation(async () => {
      await AccountModel.findOneAndUpdate({ _id: id }, args);
    });
  }
}
