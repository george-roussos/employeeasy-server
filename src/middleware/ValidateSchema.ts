import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/Logging";
import { IEmployee } from "../models/Employee.model";
import { IUser } from "../models/User.model";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      logger.error(error);
      return res.status(422).json({ message: `Error: field ${error.message}` });
    }
  };
};

export const Schemas = {
  employee: {
    create: Joi.object<IEmployee>({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      department: Joi.string().required(),
      startDate: Joi.string().required(),
      employmentType: Joi.string().required(),
    }),
    update: Joi.object<IEmployee>({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      department: Joi.string().required(),
      startDate: Joi.string().required(),
      employmentType: Joi.string().required(),
    }),
  },
  user: {
    create: Joi.object<IUser>({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(5).required(),
      passwordConfirmation: Joi.string()
        .min(5)
        .required()
        .valid(Joi.ref("password")),
    }),
    update: Joi.object<IUser>({
      name: Joi.string(),
      username: Joi.string(),
      email: Joi.string(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string()
        .min(5)
        .required()
        .valid(Joi.ref("password")),
    }),
  },
};
