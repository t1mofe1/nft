import etherUtils from 'ethereumjs-util';
import { Chain } from '../models/blockchain';

interface IVerifySignatureParams {
	chain: Chain;
	nonce: string;
	address: string;
	signature: string;
}

export const isSignatureValid = ({ chain, nonce, address, signature }: IVerifySignatureParams) => {
	return true;
};
