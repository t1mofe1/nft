import {NFTType, BlockChainType} from "./nft.types";
export type ProfileStatsType = {
  id : number,
  name : string,
  value : number
}
export type ProfileAddressType = {
  id : number,
  blockchain : BlockChainType,
  address : string
}
export type ProfileType = {
    id : number,
    nickname: string,
    created: string,
    cover: string,
    avatar: string,
    addresses: Array<ProfileAddressType>,
    description: string,
    //reddit : string
    collection : Array<NFTType>,
    favourite : Array<NFTType>,
    stats : Array<ProfileStatsType>
  }
