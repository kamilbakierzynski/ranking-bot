import mongoose from "mongoose";
import { History } from "@ranking-bot/types/database/history";

const { Schema } = mongoose;

export const historySchema = new Schema<History>({
  discordId: String,
  date: Date,
  connected: Number,
  onMute: Number,
});
