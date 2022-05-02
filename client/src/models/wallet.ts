import { IBlockChain } from "./blockchain";

export interface IWallet {
  name: string;
  logo: string;
  label: string;
  chain: IBlockChain;
  sign: (nonce: string, address: string) => Promise<any>;
  isAvailable: () => boolean;
  getAccounts: () => Promise<Array<any>> | Promise<any>;
}
