import express from 'express-session';
import { ISessionData, Session } from './session';
export interface IContext {
	session?: Readonly<Session>;
	authorization?: Readonly<string>;
	updateSession: (data: Partial<ISessionData>) => void;
}
