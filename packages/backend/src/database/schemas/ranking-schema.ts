import mongoose from "mongoose";
import { Ranking } from "@ranking-bot/types/database/ranking";

const { Schema } = mongoose;

export const rankingSchema = new Schema<Ranking>({
  date: Date,
  places: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      place: Number,
      connected: Number,
      onMute: Number,
    },
  ],
  awards: [{ type: Schema.Types.ObjectId, ref: "Award" }],
});
