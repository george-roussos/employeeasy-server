import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Employee from "../models/Employee.model";

const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, phone, email, department, startDate, employmentType } =
    req.body;
  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    phone: phone,
    email: email,
    department: department,
    startDate: startDate,
    employmentType: employmentType,
  });
  try {
    await employee.save();
    return res.status(201).json({ employee });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const readAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await Employee.find();
    return employees
      ? res.status(200).json({ employees })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateEmployee = (req: Request, res: Response, next: NextFunction) => {
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
