import { v4 } from "uuid";
import {
  Ctx,
  Arg,
  Args,
  Query,
  Mutation,
  Resolver,
  Field,
  ObjectType,
  Authorized,
} from "type-graphql";
import { IContext } from "../models/context";
import { AccountModel } from "../models/account";
import { ObjectBase } from "../models/object-base";
import { InvokeMutation } from "../utils/graphql/mutation";
import { AccountArgs, CreateAccountArgs } from "./args/account";

import Response from "../utils/graphql/response";
import { ErrorCode } from "../models/error-code";

@ObjectType()
class Nonce {
  @Field()
  value: string;
  @Field()
  expiration: number;
}
@ObjectType()
class Address {
  @Field()
  chain: string;

  @Field()
  address: string;
}

@ObjectType()
class Account extends ObjectBase {
  @Field()
  avatar: string;

  @Field()
  cover: string;

  @Field()
  nickname: string;

  @Field((t) => [Address])
  addresses: Address[];
}

@Resolver(Account)
export default class AccountResolver {

  @Query((r) => Nonce)
  getNonce(@Arg("address") address: string, @Ctx() ctx: IContext): Nonce {
    const ts = new Date();
    const value = v4().toString();

    const expiration = (ts.setHours(ts.getHours() + 1)).valueOf();

    ctx.updateSession({
      address,
      expiration,
      nonce: value
    });

    return {
      value,
      expiration
    };
  }


  @Query((r) => Account)
  async getAccount(@Arg("id") id: String): Promise<Account> {
    const account = await AccountModel.findById(id);

    if (!account) {
      throw new Error(ErrorCode.AccountNotFound);
    }

    return account;
  }

  @Query((r) => Account)
  async getAccountByKey(@Arg("key") key: String): Promise<Account> {
    const account = await AccountModel.findOne({
      $or: [{ _id: { $eq: key } }, { nickname: { $eq: key } }],
    });

    if (!account) {
      throw new Error(ErrorCode.AccountNotFound);
    }

    return account;
  }

  @Query((r) => Account)
  async getAccountByAddress(@Arg("address") address: String): Promise<Account> {
    const account = await AccountModel.findOne({ 
      "addresses.address": { 
        $in: address
      } 
    });

    if (!account) {
      throw new Error(ErrorCode.AccountNotFound);
    }

    return account;
  }

  @Mutation((r) => Response)
  async createAccount(@Args() { address, chain }: CreateAccountArgs): Promise<Response> {
    return InvokeMutation(async () => {
      await AccountModel.create({
        addresses: [{
          chain,
          address
        }]
      })
    });
  }

  @Authorized()
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
