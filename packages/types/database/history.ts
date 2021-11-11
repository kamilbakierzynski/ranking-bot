import { DiscordId } from "./discord-id";

export interface History {
  discordId: DiscordId;
  date: Date;
  connected: number;
  onMute: number;
}
