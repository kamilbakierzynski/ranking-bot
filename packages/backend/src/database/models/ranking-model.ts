import mongoose from "mongoose";
import { rankingSchema } from "../schemas/ranking-schema";
import { Ranking } from "@ranking-bot/types/database/ranking";

const { model } = mongoose;

export const RankingModel = model<Ranking>("Ranking", rankingSchema);
