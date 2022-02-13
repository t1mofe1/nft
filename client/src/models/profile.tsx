import { INft } from "./nft";

export interface IProfile {
  id: number;
  nickname: string;
  created: string;
  cover: string;
  avatar: string;
  address: string;
  description: string;
  //reddit : string
  collection: Array<INft>;
}
