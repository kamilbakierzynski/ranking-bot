import mongoose from "mongoose";
import { userSchema } from "../schemas/user-schema";
import { User } from "@ranking-bot/types/database/user";

const { model } = mongoose;

export const UserModel = model<User>("User", userSchema);
