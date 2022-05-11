type RequestMethod = "connect" | string;

export interface IPhantom {
  ready: Boolean; //Initialize to false, true after user authorization
  address: any;
  connect: () => {};
  request: (params: {
    method: RequestMethod;
    params?: unknown[] | object;
  }) => Promise<unknown>;
}
