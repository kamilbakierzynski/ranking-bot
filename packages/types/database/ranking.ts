import { User } from "./user";
import { Award } from "./award";

interface RankingPlace {
  user: User;
  place: number;
  connected: number;
  onMute: number;
  awards: Award[];
}

export interface Ranking {
  date: Date;
  places: RankingPlace[];
  awards: Award[];
}
