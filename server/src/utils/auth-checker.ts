import { AuthChecker } from "type-graphql";
import { IContext } from "../models/context";
import { isSignatureValid } from "./signature-verification";

export const authChecker: AuthChecker<IContext> = ({ root, args, context, info }, roles ) => {
  const { session, authorization } = context;

  if (!authorization) {
    return false;
  }

  const [type, token] = authorization.split(" ");

  const _signature = Buffer.from(token).toString("utf-8");
  
  const { data: { chain, nonce, address, signature, expiration } } = session;

  if (signature) {
    if (expiration < Date.now()) {
      if (signature === _signature) {
        return true;
      }
    }
  }

  const isValid = 
    isSignatureValid({
      chain,
      nonce,
      address,
      signature: _signature
    });

  if (isValid === false) {
    return false;
  }

  context.updateSession({
    signature: _signature
  });

  return true;
};