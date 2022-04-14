import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User.model";

const createUser = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    username: username,
    email: email,
    password: password,
  });
  try {
    await user.save();
    return res.status(201).json({ user });
  } catch (error: any) {
    return res.status(500).json({ message: `${error.message}` });
  }
};

const readUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    return user
      ? res.status(200).json({ user })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return users
      ? res.status(200).json({ users })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateUser = (req: Request, res: Response) => {
  const userId = req.params.userId;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not found!" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    return user
      ? res.status(200).json({ message: "OK" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export default {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
};
