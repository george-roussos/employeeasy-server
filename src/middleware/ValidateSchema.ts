import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import logger from "../library/Logging";
import { IEmployee } from "../models/Employee.model";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      logger.error(error);
      return res.status(422).json({ error });
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
};
