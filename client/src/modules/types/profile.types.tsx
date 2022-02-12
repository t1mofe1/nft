import {NFT} from "./nft.types";

export type Profile = {
    id : number,
    nickname: string,
    avatar: string,
    address: string,
    description: string,
    //reddit : string
    collection : Array<NFT>
  }
