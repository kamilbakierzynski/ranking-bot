import mongoose, { Document, Mongoose } from "mongoose";
import { User } from "@ranking-bot/types/database/user";
import { DiscordId } from "@ranking-bot/types/database/discord-id";
import { Either, Maybe } from "monet";
import { UserModel } from "../database/models";
import { History } from "@ranking-bot/types/database/history";

export class DatabaseService {
  public static async connect(): Promise<Mongoose> {
    const database = await mongoose.connect(
      "mongodb://localhost:27017/ranking-bot"
    );
    console.log("Connected to MongoDB");
    return database;
  }

  public static async findOrCreateUser(
    discordId: DiscordId
  ): Promise<Either<Error, Document<User>>> {
    const maybeUser = Maybe.fromNull(
      await UserModel.findOne({ discordId }).exec()
    );
    if (maybeUser.isNone()) {
      const user = await DatabaseService.createUser(discordId);
      return user.toEither(new Error("Unable to create new user"));
    }
    return maybeUser.toEither(new Error("Unable to fetch user from database"));
  }

  public static async findUserByDiscordId(
    discordId: DiscordId
  ): Promise<Either<Error, Document<User>>> {
    const user = await UserModel.findOne({ discordId }).exec();
    if (!user) {
      return Either.left(
        new Error(`User with [DiscordId=${discordId}] not found in database`)
      );
    }
    await user.populate("awards");
    return Either.right(user);
  }

  public static async getUserHistory(
    discordId: DiscordId
  ): Promise<Either<Error, History[]>> {
    const user = await UserModel.findOne({ discordId }).exec();
    if (!user) {
      return Either.left(
        new Error(`User with [DiscordId=${discordId}] not found in database`)
      );
    }
    await user.populate("history");
    const history = (user.toObject() as User).history;
    return Either.right(history);
  }

  private static async createUser(
    discordId: DiscordId
  ): Promise<Maybe<Document<User>>> {
    console.log(
      `Creating new database entry for user with DiscordId: ${discordId}`
    );
    const newUserData = {
      discordId,
      username: "",
      lastSeen: Date.now(),
      connected: {},
      onMute: {},
      record: {},
      awards: [],
      ranking: [],
    };
    const newUser = new UserModel(newUserData);
    try {
      await newUser.validate();
      await newUser.save();
    } catch (error) {
      return Maybe.none();
    }
    return Maybe.some(newUser);
  }
}
