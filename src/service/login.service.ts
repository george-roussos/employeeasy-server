import UserModel from "../models/User.model";

export async function validatePassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await UserModel.findOne({ username });
  if (!user) {
    return false;
  } else {
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;
    return user;
  }
}
