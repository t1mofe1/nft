import { Session, SessionData } from 'express-session';

export interface IContext {
    session?: Session & Partial<SessionData>
}