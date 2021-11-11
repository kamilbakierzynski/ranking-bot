import { UserModel } from "../database/models";
import { RankingRange } from "@ranking-bot/types/api/ranking-range";
import {
  ConnectionStats,
  RankingUser,
  User,
} from "@ranking-bot/types/database/user";
import { Document } from "mongoose";

type NotRankedUser = Omit<RankingUser, "place">;

export class RankingService {
  public static async getRanking(
    range = RankingRange.WEEK
  ): Promise<RankingUser[]> {
    const allUsers = await UserModel.find().exec();
    const rangeKey = this.mapRankingRangeToMongoProp(range);

    const userRangeMapper = this.mapFullUserToRankingUser(rangeKey);
    const usersWithoutPlace = allUsers
      .map(userRangeMapper)
      .filter(this.skipNotConnectedUsers);
    const sortedUsers = usersWithoutPlace.sort(this.sortRankingUser);
    return sortedUsers.map(this.mapAddPlace);
  }

  private static mapRankingRangeToMongoProp(
    range: RankingRange
  ): keyof ConnectionStats {
    const map: Record<RankingRange, keyof ConnectionStats> = {
      [RankingRange.DAY]: "thisDay",
      [RankingRange.WEEK]: "thisWeek",
      [RankingRange.MONTH]: "thisMonth",
      [RankingRange.YEAR]: "thisYear",
      [RankingRange.ALL_TIME]: "allTime",
    };
    return map[range] ?? map[RankingRange.WEEK];
  }

  private static mapFullUserToRankingUser(
    rangeKey: keyof ConnectionStats
  ): (user: Document<User>) => NotRankedUser {
    return (user: Document<User>) => {
      const userObject = user.toObject() as User;
      return {
        discordId: userObject.discordId,
        avatarUrl: userObject.avatarUrl,
        username: userObject.username,
        connected: userObject.connected[rangeKey],
        onMute: userObject.onMute[rangeKey],
      };
    };
  }

  private static mapAddPlace(user: NotRankedUser, index: number): RankingUser {
    return {
      ...user,
      place: ++index,
    };
  }

  private static sortRankingUser(a: NotRankedUser, b: NotRankedUser): number {
    if (a.connected > b.connected) {
      return -1;
    }
    if (a.connected < b.connected) {
      return 1;
    }
    return a.onMute - b.onMute;
  }

  private static skipNotConnectedUsers(user: NotRankedUser): boolean {
    return !(user.connected === 0 && user.onMute === 0);
  }
}
