import { GraphqlQuery } from "../services/gql/query";

export class GetBlockChains extends GraphqlQuery {
  constructor() {
    super(null, ["name", "label", "symbol", "logo"]);
  }
}
