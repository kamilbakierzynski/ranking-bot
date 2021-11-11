import { DiscordId } from "./discord-id";
import { Award } from "./award";
import { Ranking } from "./ranking";
import { History } from "./history";

export interface ConnectionStats {
  thisDay: number;
  thisWeek: number;
  thisMonth: number;
  thisYear: number;
  allTime: number;
}

interface SingleEntryConnectionStats {
  connected: number;
  onMute: number;
}

interface RecordStats {
  day: SingleEntryConnectionStats;
  week: SingleEntryConnectionStats;
  month: SingleEntryConnectionStats;
  year: SingleEntryConnectionStats;
}

export interface User {
  discordId: DiscordId;
  avatarUrl: string;
  lastSeen: Date;
  username: string;
  connected: ConnectionStats;
  onMute: ConnectionStats;
  record: RecordStats;
  awards: Award[];
  ranking: Ranking[];
  history: History[];
}

export interface RankingUser
  extends SingleEntryConnectionStats,
    Pick<User, "discordId" | "username" | "avatarUrl"> {
  place: number;
}
