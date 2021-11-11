import mongoose from "mongoose";
import { awardSchema } from "../schemas/award-schema";
import { Award } from "@ranking-bot/types/database/award";

const { model } = mongoose;

export const AwardModel = model<Award>("Award", awardSchema);
