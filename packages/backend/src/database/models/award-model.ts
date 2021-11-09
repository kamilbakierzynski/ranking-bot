import mongoose from "mongoose";
import { awardSchema } from "../schemas/award-schema";

const { model } = mongoose;

export const Award = model("Award", awardSchema);
