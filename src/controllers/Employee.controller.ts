import { NextFunction, Request, Response } from "express";
import { verifyJwt, getTokenFrom } from "../utils/jwt.util";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Employee from "../models/Employee.model";
import User, { IUser } from "../models/User.model";

const createEmployee = async (req: Request, res: Response) => {
  const { name, phone, email, department, startDate, employmentType, manager } =
    req.body;
  const token = getTokenFrom(req);
  const decodedToken = verifyJwt(token!);
  const user = await User.findOne({ name: manager });
  if (
    !decodedToken._doc._id ||
    JSON.stringify(decodedToken._doc._id) !== JSON.stringify(user!._id)
  ) {
    return res.status(401).json({ error: "Permission denied" });
  }
  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    phone: phone,
    email: email,
    department: department,
    startDate: startDate,
    employmentType: employmentType,
    manager: user ? user._id : undefined,
  });
  try {
    await employee.save();
    user.employees = user!.employees.concat(employee._id);
    await user!.save();
    return res.status(201).json({ employee });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readEmployee = async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  try {
    const employee = await Employee.findById(employeeId);
    return employee
      ? res.status(200).json({ employee })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find().populate("manager", {
      name: 1,
    });
    return employees
      ? res.status(200).json({ employees })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateEmployee = async (req: Request, res: Response) => {
  const token = getTokenFrom(req);
  const decodedToken = verifyJwt(token!);
  const user = await User.findOne({ name: req.body.manager });
  if (
    !decodedToken._doc._id ||
    JSON.stringify(decodedToken._doc._id) !== JSON.stringify(user._id)
  ) {
    return res.status(401).json({ error: "Permission denied" });
  }
  const employeeId = req.params.employeeId;
  return Employee.findById(employeeId)
    .then((employee) => {
      if (employee) {
        employee.set(req.body);

        return employee
          .save()
          .then((employee) => res.status(201).json({ employee }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not found!" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFrom(req);
  const decodedToken = verifyJwt(token!);
  if (
    !decodedToken._doc._id ||
    JSON.stringify(decodedToken._doc._id) !== JSON.stringify(user._id)
  ) {
    return res.status(401).json({ error: "Permission denied" });
  }
  const employeeId = req.params.employeeId;
  try {
    const employee = await Employee.findByIdAndDelete(employeeId);
    return employee
      ? res.status(200).json({ message: "OK" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export default {
  createEmployee,
  readEmployee,
  readAllEmployees,
  updateEmployee,
  deleteEmployee,
};
