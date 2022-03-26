import { GraphqlQuery } from "../services/gql/query";
import { GraphqlMutation } from "../services/gql/mutation";

export class GetAccountByAddress extends GraphqlQuery {
  constructor(address: string) {
    super({ address }, ["nickname", "publicAddress"]);
  }
}
