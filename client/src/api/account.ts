import { GraphqlQuery } from "../services/gql/query";
import { GraphqlMutation } from "../services/gql/mutation";
import { IAccount } from "../models/account";

const defaultFields = [
  "id",
  "cover",
  "avatar", 
  "nickname",
  "addresses { chain, address }"
];

export class GetNonce extends GraphqlQuery {
  constructor(address: string) {
    super({ address }, [
      "value",
      "expiration"
    ]);
  }
}

export class GetAccount extends GraphqlQuery {
  constructor(id: string) {
    super({ id }, defaultFields);
  }
}

export class GetAccountByKey extends GraphqlQuery {
  constructor(key: string) {
    super({ key }, defaultFields);
  }
}

export class GetAccountByAddress extends GraphqlQuery {
  constructor(address: string) {
    super({ address }, defaultFields);
  }
}

export class CreateAccount extends GraphqlMutation {
  constructor(address: string, chain: string) {
    super({
      chain,
      address,
    });
  }
}

export class UpdateAccount extends GraphqlMutation {
  constructor(id: string, args: Partial<IAccount>) {
    super({
      id,
      args,
    });
  }
}
