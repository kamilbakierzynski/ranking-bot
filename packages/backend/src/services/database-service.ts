import mongoose, { Mongoose } from "mongoose";

export class DatabaseService {
  public static async connect(): Promise<Mongoose> {
    const database = await mongoose.connect(
      "mongodb://localhost:27017/ranking-bot"
    );
    console.log("Connected to MongoDB");
    return database;
  }
}
