import { Arg, Args, ArgsType, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { ObjectBase } from '../models/object-base';

@ObjectType()
export class Category extends ObjectBase {
	@Field()
	name: string;
}

@Resolver(Category)
export default class CategoryResolver {
	@Query(r => [Category])
	async getCategories(): Promise<Category[]> {
		return [];
	}
}
