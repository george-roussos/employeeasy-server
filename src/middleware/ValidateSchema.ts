import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { IEmployee } from "../models/Employee.model";
import { IExpense } from "../models/Expense.model";
import { IVacation } from "../models/Vacation.model";
import { IUser } from "../models/User.model";
import logger from "../utils/Logging";

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
      country: Joi.string().required(),
      startDate: Joi.string().required(),
      employmentType: Joi.string().required(),
      avatar: Joi.string(),
    }),
    update: Joi.object<IEmployee>({
      name: Joi.string(),
      phone: Joi.string(),
      email: Joi.string(),
      department: Joi.string(),
      country: Joi.string(),
      startDate: Joi.string(),
      employmentType: Joi.string(),
      avatar: Joi.string(),
    }),
  },
  user: {
    create: Joi.object<IUser>({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      avatar: Joi.string(),
      password: Joi.string().min(5).required(),
      passwordConfirmation: Joi.string()
        .min(5)
        .required()
        .valid(Joi.ref("password")),
    }),
    update: Joi.object<IUser>({
      name: Joi.string(),
      username: Joi.string().required,
      email: Joi.string(),
      avatar: Joi.string(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string()
        .min(5)
        .required()
        .valid(Joi.ref("password")),
    }),
  },
  expense: {
    create: Joi.object<IExpense>({
      date: Joi.string().required(),
      merchant: Joi.string().required(),
      amount: Joi.number().required(),
      currency: Joi.string().required(),
      employee: Joi.string().required(),
      status: Joi.string().required(),
    }),
    update: Joi.object<IExpense>({
      date: Joi.string().required(),
      merchant: Joi.string().required(),
      amount: Joi.number().required(),
      currency: Joi.string().required(),
      employee: Joi.string().required(),
      status: Joi.string().required(),
    }),
  },
  vacation: {
    create: Joi.object<IVacation>({
      employee: Joi.string().required(),
      startOn: Joi.string().required(),
      endOn: Joi.string().required(),
      daysLeft: Joi.number().required(),
      status: Joi.string().required(),
    }),
    update: Joi.object<IVacation>({
      employee: Joi.string().required(),
      startOn: Joi.string().required(),
      endOn: Joi.string().required(),
      daysLeft: Joi.number().required(),
      status: Joi.string().required(),
    }),
  },
};
