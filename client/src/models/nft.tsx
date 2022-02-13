export interface IBlockChain {
  id: number;
  name: string;
  logo: string;
  //url : string
}
export interface IFavourite {
  // id : number; 
  count: number;
  isFavourite?: boolean;
}
export interface INft {
  id: number;
  name: string;
  cover: string;
  price: number;
  priceSale?: number;
  favourite?: IFavourite;
  status?: string;
  blockchain: IBlockChain;
}
