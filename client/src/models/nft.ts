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
  language: string;
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
export interface INftTransaction {
  key: number;
  to: IProfileAddress;
  from: IProfileAddress;
  date: Date;
  blockchain: IBlockChain;
  price: number;
  type: string;
}
export interface INftOffer extends INftTransaction {
  endDate: Date;
}
export interface INftCollection {
  key: number;
  name: string;
  url?: string;
  avatar?: string;
  cover?: string;
  author: IProfile;
  createdAt: Date;
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
  owner: IProfile;
  creator: IProfile;
  createdAt: Date;
  status?: string;
  category: string;
  blockchain: IBlockChain;
  renderer: IRenderer;
  boosted?: {
    category: string;
  };
  collection: INftCollection;
  metaData: Array<INftMetaData>;
  lastTransactions?: Array<INftTransaction>;
  lastOffers?: Array<INftOffer>;
}
export interface INftType {
  key: number;
  name: string;
}
export interface INftFilterProps {
  blockchains: Array<IBlockChain>;
  languages: Array<IRenderLanguage>;
  categories: Array<INftCategory>;
  libraries: Array<IRenderLibrary>;
  types: Array<INftType>;
}
export interface INftFilter {
  blockchains: Array<string>;
  languages: Array<string>;
  categories: Array<string>;
  libraries: Array<IRenderLibrary>;
  types: Array<INftType>;
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
export interface INftTimeDifference {
  difference: number;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}
