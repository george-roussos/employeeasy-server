import { Request, Response } from "express";
import { config } from "../config/config";
import { signJwt } from "../utils/jwt.util";
import { validatePassword } from "../service/login.service";

const loginUser = async (req: Request, res: Response) => {
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Username or password is invalid");
  }
  const accessToken = signJwt(
    { ...user, privateKey: config.user.privateKey },
    { expiresIn: 60 * 60 }
  );
  res.send(accessToken);
};

export default {
  loginUser,
};
