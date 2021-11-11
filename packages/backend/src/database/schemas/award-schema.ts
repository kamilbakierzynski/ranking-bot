import mongoose from "mongoose";
import { Award } from "@ranking-bot/types/database/award";

const { Schema } = mongoose;

export const awardSchema = new Schema<Award>({
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  place: Number,
  connected: Number,
  onMute: Number,
});
