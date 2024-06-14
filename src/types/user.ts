export type UserType = {
  _id: string;
  name: string;
  imageUrl: string;
  bean: string;
  rank: string;
  guildId: string;
  isLoginFirstTime: boolean;
  cats: string[];
  location: string[];
};

export type LoginBody = {
  type: string;
  telegramId: string;
};

export type LoginRepsonse = {
  jwt: string;
  user: UserType;
};
