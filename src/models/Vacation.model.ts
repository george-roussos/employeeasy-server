import mongoose, { Document, Schema } from "mongoose";

export interface IVacation {
  employee: string;
  startOn: string;
  endOn: number;
  daysLeft: string;
  status: string;
}

export interface IVacationModel extends IVacation, Document {}

const VacationSchema: Schema = new Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    startOn: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(\d){4}-(\d){2}-(\d){2}/.test(v);
        },
        message: "Please enter start date in format YYYY-MM-DD",
      },
    },
    endOn: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(\d){4}-(\d){2}-(\d){2}/.test(v);
        },
        message: "Please enter start date in format YYYY-MM-DD",
      },
    },
    daysLeft: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IVacationModel>("Vacation", VacationSchema);
