export interface IAccount {
  id: string;
  cover: string;
  avatar: string;
  nickname: string;
  addresses: Array<{
    chain: string;
    address: string;
  }>;
}
