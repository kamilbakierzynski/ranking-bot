import mongoose from "mongoose";
import { History } from "@ranking-bot/types/database/history";
import { historySchema } from "../schemas/history-schema";

const { model } = mongoose;

export const HistoryModel = model<History>("History", historySchema);
