import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee {
  name: string;
  phone: string;
  email: string;
  department: string;
  startDate: string;
  employmentType: string;
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
    startDate: { type: String, required: true },
    employmentType: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IEmployeeModel>("Employee", EmployeeSchema);
