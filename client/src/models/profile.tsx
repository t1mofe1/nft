import { INft, IBlockChain } from "./nft";

export interface IProfileStats  {
  id : number;
  name : string;
  value : number;
}
export interface IProfileAddress  {
  id : number;
  blockchain : IBlockChain;
  address : string;
}
export interface IProfile {
  id : number;
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
