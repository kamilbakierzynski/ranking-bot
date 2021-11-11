import mongoose from "mongoose";
import { User } from "@ranking-bot/types/database/user";

const { Schema } = mongoose;

export const userSchema = new Schema<User>({
  discordId: String,
  avatarUrl: String,
  lastSeen: Date,
  username: String,
  connected: {
    thisDay: { type: Number, default: 0 },
    thisWeek: { type: Number, default: 0 },
    thisMonth: { type: Number, default: 0 },
    thisYear: { type: Number, default: 0 },
    allTime: { type: Number, default: 0 },
  },
  onMute: {
    thisDay: { type: Number, default: 0 },
    thisWeek: { type: Number, default: 0 },
    thisMonth: { type: Number, default: 0 },
    thisYear: { type: Number, default: 0 },
    allTime: { type: Number, default: 0 },
  },
  record: {
    day: {
      connected: { type: Number, default: 0 },
      onMute: { type: Number, default: 0 },
    },
    week: {
      connected: { type: Number, default: 0 },
      onMute: { type: Number, default: 0 },
    },
    month: {
      connected: { type: Number, default: 0 },
      onMute: { type: Number, default: 0 },
    },
    year: {
      connected: { type: Number, default: 0 },
      onMute: { type: Number, default: 0 },
    },
  },
  awards: [{ type: Schema.Types.ObjectId, ref: "Award" }],
  ranking: [{ type: Schema.Types.ObjectId, ref: "Ranking" }],
  history: [{ type: Schema.Types.ObjectId, ref: "History" }],
});
