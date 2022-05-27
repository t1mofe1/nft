import { ISessionData, Session } from './session';
import express from 'express-session';

export interface IContext {
    session?: Readonly<Session>;
    authorization?: Readonly<string>;
    updateSession: (data: Partial<ISessionData>) => void;
}