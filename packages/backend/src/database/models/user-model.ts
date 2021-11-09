import mongoose from "mongoose";
import { userSchema } from "../schemas/user-schema";

const { model } = mongoose;

export const User = model("User", userSchema);
