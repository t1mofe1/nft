export interface IBlockChain {
  id: number;
  name: string;
  logo: string;
  //url : string
}
export interface INft {
  id: number;
  cover: string;
  price: number;
  blockchain: IBlockChain;
  name: string;
  status: string;
}
