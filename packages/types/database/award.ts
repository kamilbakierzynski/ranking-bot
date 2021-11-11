import { User } from "./user";

export interface Award {
  date: Date;
  user: User;
  place: number;
  connected: number;
  onMute: number;
}
