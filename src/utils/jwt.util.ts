import jwt from "jsonwebtoken";
import { config } from "../config/config";

const privateKey: string = config.user.privateKey;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}
