import { IBlockChain } from "./blockchain";

export interface IWallet {
  name: string;
  logo: string;
  label: string;
  description: string;
  chain: IBlockChain;
  url: string;
  androidAppUrl?: string;
  iosAppUr?: string;
  sign: (nonce: string, address: string) => Promise<any>;
  isAvailable: () => boolean;
  connect: () => Promise<any>;
  getAccount: (resp: any) => string;
}
