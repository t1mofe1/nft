export type BlockChain = {
    name : string,
    logo : string,
   //url : string
  }
 export type NFT = {
    id:number
    cover: string,
    price : number,
    blockchain: BlockChain,
    name : string,
    status : string
 }