import { IBlockChain } from "./blockchain";

export interface IProfileStats {
  key: number;
  name: string;
  value: number;
}

export interface IProfileAddress {
  key: number;
  blockchain: IBlockChain;
  address: string;
}

export interface IProfile {
  key: number;
  nickname: string;
  created: Date;
  cover: string;
  avatar: string;
  addresses: Array<IProfileAddress>;
  description: string;
  stats: Array<IProfileStats>;
}
