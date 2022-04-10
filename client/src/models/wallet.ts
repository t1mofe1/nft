export interface IWallet {
  name: string;
  label: string;
  sign: () => Promise<void>;
  isAvailable: () => boolean;
  getAccounts: () => Promise<Array<any>>;
}
