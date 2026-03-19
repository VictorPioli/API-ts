import mongoose from "mongoose";
import { IUserDocument } from "./IUserDocumente.js";

const UserSchema = new mongoose.Schema<IUserDocument>({
  name: String,
  email: String,
  password: String
});

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);