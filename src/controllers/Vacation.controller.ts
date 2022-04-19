import mongoose from "mongoose";
import { Request, Response } from "express";
import Vacation from "../models/Vacation.model";
import Employee from "../models/Employee.model";

const createVacation = async (req: Request, res: Response) => {
  const { employee, startOn, endOn, daysLeft, status } = req.body;
  const vacation = new Vacation({
    _id: new mongoose.Types.ObjectId(),
    employee: await Employee.findOne({ name: employee }),
    startOn: startOn,
    endOn: endOn,
    daysLeft: daysLeft,
    status: status,
  });
  try {
    await vacation.save();
    return res.status(201).json({ vacation });
  } catch (error: any) {
    return res.status(500).json({ message: `${error.message}` });
  }
};

const readVacation = async (req: Request, res: Response) => {
  const vacationId = req.params.vacationId;
  try {
    const vacation = await Vacation.findById(vacationId);
    return vacation
      ? res.status(200).json({ vacation })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAllVacations = async (req: Request, res: Response) => {
  try {
    const vacations = await Vacation.find({}).populate("employee", { name: 1 });
    return vacations
      ? res.status(200).json({ vacations })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateVacation = (req: Request, res: Response) => {
  const vacationId = req.params.vacationId;
  return Vacation.findById(vacationId)
    .then((vacation) => {
      if (vacation) {
        vacation.set(req.body);

        return vacation
          .save()
          .then((vacation) => res.status(201).json({ vacation }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not found!" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteVacation = async (req: Request, res: Response) => {
  const vacationId = req.params.vacationId;
  try {
    const vacation = await Vacation.findByIdAndDelete(vacationId);
    return vacation
      ? res.status(200).json({ message: "OK" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export default {
  createVacation,
  readVacation,
  readAllVacations,
  updateVacation,
  deleteVacation,
};
