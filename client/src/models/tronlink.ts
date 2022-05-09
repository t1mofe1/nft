type RequestMethod = "tron_requestAccounts" | string;

export interface ITronlink {
  ready: Boolean; //Initialize to false, true after user authorization
  trx: any;
  toHex: any;
  address: any;
  request: (params: {
    method: RequestMethod;
    params?: unknown[] | object;
  }) => Promise<unknown>;
}
