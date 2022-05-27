import { Chain } from './blockchain';
import session from 'express-session';

export interface ISessionData {
    chain: Chain;
    nonce: string;
    address: string;
    signature: string;
    expiration: number;
}

export type Session = session.Session & Partial<session.SessionData> & Partial<{ data: Readonly<Partial<ISessionData>> }>;