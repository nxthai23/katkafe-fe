export type UserType = {
  id: string;
  name: string;
  imageUrl: string;
  balance: string;
  rank: string;
  guildId: string;
  isLoginFirstTime: boolean;
};

export type LoginBody = {
  type: string;
  telegramId: string;
};

export type LoginRepsonse = {
  jwt: string;
  user: UserType;
};
