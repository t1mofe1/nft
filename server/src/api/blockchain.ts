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
import config from "config";

@ObjectType()
export class BlockChain {
  @Field()
  name: string;

  @Field()
  label: string;

  @Field()
  symbol: string;

  @Field()
  logo: string;
}

@Resolver(BlockChain)
export default class BlockChainResolver {
  @Query((r) => [BlockChain])
  async getBlockChains(): Promise<BlockChain[]> {
    return config.get("blockChains");
  }
}
