type RequestMethod =
  | "tron_requestAccounts"
  | string;

export interface ITronlink {
  ready: Boolean; //Initialize to false, true after user authorization
  sunWeb: any;
  tronWeb: any;
  request: (params: {
    method: RequestMethod;
    params?: unknown[] | object;
  }) => Promise<unknown>;
}




