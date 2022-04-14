import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  employees: [];
}

export interface IUserModel extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    // Assign type string to phone number because of country code
    name: { type: String, required: true },
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
    password: { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { versionKey: false, timestamps: true }
);

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.password;
  },
});

UserSchema.pre("save", async function (next) {
  let user = this as IUserModel;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserModel;

  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((error: any) => false);
};

export default mongoose.model<IUserModel>("User", UserSchema);
