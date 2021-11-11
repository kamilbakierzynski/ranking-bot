import { Either } from "monet";
import { HistoryModel, UserModel } from "../database/models";
import { History } from "@ranking-bot/types/database/history";
import { User } from "@ranking-bot/types/database/user";

export class ActionsService {
  public static async handleSaveCurrentDay(): Promise<Either<Error, boolean>> {
    const allUsers = await UserModel.find().exec();
    const currentDate = new Date();
    for (const user of allUsers) {
      const userObject = user.toObject() as User;

      const newHistoryEntry = new HistoryModel({
        discordId: userObject.discordId,
        date: currentDate,
        connected: userObject.connected.thisDay,
        onMute: user.onMute.thisDay,
      } as History);
      await newHistoryEntry.save();

      const newHistoryEntryId = newHistoryEntry._id;
      user.history.push(newHistoryEntryId);
      await user.save();
    }

    await UserModel.updateMany(
      {},
      { $set: { "connected.thisDay": 0, "onMute.thisDay": 0 } }
    ).exec();

    return Either.right(true);
  }

  public static async handleResetCurrentWeek(): Promise<
    Either<Error, boolean>
  > {
    await UserModel.updateMany(
      {},
      { $set: { "connected.thisWeek": 0, "onMute.thisWeek": 0 } }
    ).exec();

    return Either.right(true);
  }

  public static async handleResetCurrentMonth(): Promise<
    Either<Error, boolean>
  > {
    await UserModel.updateMany(
      {},
      { $set: { "connected.thisMonth": 0, "onMute.thisMonth": 0 } }
    ).exec();

    return Either.right(true);
  }

  public static async handleResetCurrentYear(): Promise<
    Either<Error, boolean>
  > {
    await UserModel.updateMany(
      {},
      { $set: { "connected.thisYear": 0, "onMute.thisYear": 0 } }
    ).exec();

    return Either.right(true);
  }
}
