export interface IBlockChain {
  key: number;
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
  key: number;
  name: string;
  cover: string;
  price: number;
  priceSale?: number;
  favourite?: IFavourite;
  status?: string;
  category:string;
  blockchain: IBlockChain;
}
