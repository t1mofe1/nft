import {NFT} from "./nft.types";

export type Profile = {
    id : number,
    nickname: string,
    created: string,
    cover: string,
    avatar: string,
    address: string,
    description: string,
    //reddit : string
    collection : Array<NFT>
  }
