type RequestMethod =
  | "eth_requestAccounts"
  | "eth_sendTransaction"
  | "eth_personalSign"
  | "eth_signTypedData"
  | "eth_getBalance"
  | string;

export interface IEtherum {
  request: (params: {
    method: RequestMethod;
    params?: unknown[] | object;
  }) => Promise<unknown>;
}
