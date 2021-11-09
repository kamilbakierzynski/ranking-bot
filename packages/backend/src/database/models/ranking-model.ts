import mongoose from "mongoose";
import { rankingSchema } from "../schemas/ranking-schema";

const { model } = mongoose;

export const Ranking = model("Ranking", rankingSchema);
