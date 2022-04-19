import mongoose, { Document, Schema } from "mongoose";

export interface IExpense {
  date: string;
  merchant: string;
  amount: number;
  currency: string;
  employee: string;
  status: string;
}

export interface IExpenseModel extends IExpense, Document {}

const ExpenseSchema: Schema = new Schema(
  {
    date: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(\d){4}-(\d){2}-(\d){2}/.test(v);
        },
        message: "Please enter start date in format YYYY-MM-DD",
      },
    },
    merchant: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    status: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IExpenseModel>("Expense", ExpenseSchema);
