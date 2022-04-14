import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee {
  name: string;
  phone: string;
  email: string;
  department: string;
  startDate: string;
  employmentType: string;
  manager: string;
}

export interface IEmployeeModel extends IEmployee, Document {}

const EmployeeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    // Assign type string to phone number because of country code
    phone: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: `Please enter a valid email address`,
      },
    },
    department: { type: String, required: true },
    startDate: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(\d){4}-(\d){2}-(\d){2}/.test(v);
        },
        message: "Please enter start date in format YYYY-MM-DD",
      },
    },
    employmentType: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

export default mongoose.model<IEmployeeModel>("Employee", EmployeeSchema);
