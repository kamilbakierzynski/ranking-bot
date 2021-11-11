export interface UserPOST {
  discordId: string;
  avatarUrl: string;
  username: string;
  connected: number;
  onMute: number;
}

export interface UsersUpdatePost {
  users: UserPOST[];
}
