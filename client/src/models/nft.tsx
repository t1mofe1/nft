import { IProfile, IProfileAddress } from "./profile";

export interface IBlockChain {
  key: number;
  name: string;
  logo: string;
  //url : string
}
export interface IRenderLanguage {
  name: string;
  logo: string;
  url?: string;
}
export interface IRenderLibrary {
  name: string;
  logo: string;
  url?: string;
}
export interface IRenderer {
  language: IRenderLanguage;
  library?: IRenderLibrary;
}
export interface IFavourite {
  // id : number;
  count?: number;
  countLast7D?: number;
  isFavourite?: boolean;
}
export interface INftStats {
  name: string;
  value: number | Array<number>;
  avatar?: string;
}
export interface INftCollection {
  key: number;
  name: string;
  url?: string;
  avatar?: string;
  cover?: string;
  author: IProfile;
  createdAt: string;
  stats?: Array<INftStats>;
  renderer: IRenderer;
  blockchains: Array<IBlockChain>;
  description?: string;
}
export interface INftMetaData {
  name: string;
  value: string;
}
export interface INft {
  key: number;
  name: string;
  description?: string;
  cover: string;
  price: number;
  priceSale?: number;
  saleEnds?: Date;
  favourite?: IFavourite;
  owner: number;
  createdBy: number;
  createdAt: string;
  status?: string;
  category: string;
  blockchain: IBlockChain;
  renderer: IRenderer;
  boosted?: {
    category: string;
  };
  collectionKey: number;
  metaData: Array<INftMetaData>;
}
export interface INftFilterProps {
  blockchains: Array<IBlockChain>;
  languages: Array<IRenderLanguage>;
  categories: Array<INftCategory>;
}
export interface INftFilter {
  blockchains: Array<string>;
  languages: Array<string>;
  categories: Array<string>;
}
export interface INftCategory {
  key: number;
  name: string;
  uri: string;
  color?: string;
  description: string;
  cover?: string;
}

export interface INftHeader {
  key: number;
  cover?: string;
  avatar?: string;
  name: string;
  addresses?: Array<IProfileAddress>;
  description?: String;
}

export interface INftActionButton {
  key: string | number;
  name: string;
  icon: string;
  url: string;
}
