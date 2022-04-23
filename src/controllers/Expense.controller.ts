import { Request, Response } from "express";

import Employee from "../models/Employee.model";
import Expense from "../models/Expense.model";
import mongoose from "mongoose";

const createExpense = async (req: Request, res: Response) => {
  const { date, merchant, amount, currency, employee, status } = req.body;
  const expense = new Expense({
    _id: new mongoose.Types.ObjectId(),
    date: date,
    merchant: merchant,
    amount: amount,
    currency: currency,
    status: status,
    employee: await Employee.findOne({ name: employee }),
  });
  try {
    await expense.save();
    return res.status(201).json({ expense });
  } catch (error: any) {
    return res.status(500).json({ message: `${error.message}` });
  }
};

const readExpense = async (req: Request, res: Response) => {
  const expenseId = req.params.expenseId;
  try {
    const expense = await Expense.findById(expenseId);
    return expense
      ? res.status(200).json({ expense })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAllExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find({}).populate("employee", {
      name: 1,
      avatar: 1,
    });
    return expenses
      ? res.status(200).json({ expenses })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateExpense = (req: Request, res: Response) => {
  const expenseId = req.params.expenseId;
  return Expense.findById(expenseId)
    .then((expense) => {
      if (expense) {
        expense.set(req.body);

        return expense
          .save()
          .then((expense) => res.status(201).json({ expense }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not found!" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteExpense = async (req: Request, res: Response) => {
  const expenseId = req.params.expenseId;
  try {
    const expense = await Expense.findByIdAndDelete(expenseId);
    return expense
      ? res.status(200).json({ message: "OK" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export default {
  createExpense,
  readExpense,
  readAllExpenses,
  updateExpense,
  deleteExpense,
};
