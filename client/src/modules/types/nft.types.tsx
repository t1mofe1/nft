export type BlockChainType = {
    id : number
    name : string,
    logo : string,
   //  logoWidth : string
   //url : string
  }
 export type NFTType = {
    id : number
    cover: string,
    price : number,
    blockchain: BlockChainType,
    name : string,
    status : string
 }