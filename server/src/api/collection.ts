import { Arg, Args, ArgsType, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { ObjectBase } from '../models/object-base';
import { InvokeMutation } from '../utils/graphql/mutation';
import Response from '../utils/graphql/response';
import { CollectionArgs } from './args/collection';

@ObjectType()
export class Collection extends ObjectBase {
	@Field()
	name: string;
}

@Resolver(Collection)
export default class CollectionResolver {
	@Query(r => [Collection])
	async getCollections(): Promise<Collection[]> {
		return [];
	}

	@Query(r => [Collection])
	async getCollectionsByAccount(@Arg('id') id: string): Promise<Collection[]> {
		return [];
	}

	@Mutation(r => Response)
	async createCollection(args: CollectionArgs): Promise<Response> {
		return InvokeMutation(async () => {});
	}

	@Mutation(r => Response)
	async updateCollection(@Arg('id') id: string, @Args() args: CollectionArgs): Promise<Response> {
		return InvokeMutation(async () => {});
	}

	@Mutation(r => Response)
	async deleteOrUpdateCollection(@Arg('id') id: string): Promise<Response> {
		return InvokeMutation(async () => {});
	}
}
