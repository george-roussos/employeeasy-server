import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { Request } from "express";

const privateKey: string = config.user.privateKey;
const publicKey: string = config.user.publicKey;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
  });
}

export function verifyJwt(token: string) {
  try {
    const decodedToken = jwt.verify(token, privateKey);
    return decodedToken;
  } catch (error: any) {
    return error;
  }
}

export const getTokenFrom = (request: Request): string | null => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};
