import config from 'config';
import { Arg, Args, ArgsType, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';

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
	@Query(r => [BlockChain])
	async getBlockChains(): Promise<BlockChain[]> {
		return config.get('blockChains');
	}
}
