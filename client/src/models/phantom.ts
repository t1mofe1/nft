type RequestMethod = "connect" | "getBalance" | string;
import { PublicKey } from "@solana/web3.js";

export interface IPhantom {
  ready: Boolean; //Initialize to false, true after user authorization
  address: PublicKey;
  connect: () => {};
  signMessage: (message: Uint8Array, encoding: string) => Promise<any>;
  request: (params: {
    method: RequestMethod;
    params?: unknown[] | object;
  }) => Promise<unknown>;
}
