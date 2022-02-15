import { INft, IBlockChain } from "./nft";

export interface IProfileStats  {
  key : number;
  name : string;
  value : number;
}
export interface IProfileAddress  {
  key : number;
  blockchain : IBlockChain;
  address : string;
}
export interface IProfile {
  key : number;
  nickname: string;
  created: string;
  cover: string;
  avatar: string;
  addresses: Array<IProfileAddress>;
  description: string;
  //reddit : string
  collection : Array<INft>;
  favourite : Array<INft>;
  stats : Array<IProfileStats>;
}
