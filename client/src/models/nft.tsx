export interface IBlockChain {
  key: number;
  name: string;
  logo: string;
  //url : string
}
export interface IRenderLanguage {
  name : string;
  logo: string;
  url?: string;

}
export interface IRenderLibrary{
  name : string;
  logo: string;
  url?: string
}
export interface IRenderer {
  language: IRenderLanguage;
  library? : IRenderLibrary;
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
  renderer: IRenderer;
}
export interface INftFilterProps  {
  blockchains : Array<IBlockChain>;
  languages: Array<IRenderLanguage>;
  categories: Array<string>;
}