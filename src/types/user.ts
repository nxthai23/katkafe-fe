export type UserType = {
  id: string;
  name: string;
  imageUrl: string;
  balance: string;
  rank: string;
  guildId: string;
};

export type LoginBody = {
  type: string;
  telegramId: string;
};
