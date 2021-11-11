import "../database/models";
import { usersUpdate } from "./users/update-users";
import { status } from "./status/status";
import { getUserHistory } from "./user/get-user-history";
import { getUserByDiscordId } from "./user/get-user-by-discord-id";
import { getRanking } from "./ranking/get-ranking";
import { saveCurrentDay } from "./actions/save-current-day";
import { resetCurrentWeek } from "./actions/reset-current-week";
import { resetCurrentMonth } from "./actions/reset-current-month";
import { resetCurrentYear } from "./actions/reset-current-year";

export const initializeRoutes = () => {
  usersUpdate();
  status();
  getUserByDiscordId();
  getRanking();
  getUserHistory();
  saveCurrentDay();
  resetCurrentWeek();
  resetCurrentMonth();
  resetCurrentYear();
};
