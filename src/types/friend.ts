export type Friend = {
  _id: string;
  username: string;
  avatarUrl: string;
  referralCounter: number;
};

export type Rank = {
  _id: string;
  name: string;
  numberReferral: number;
  beanReward: string;
  imgUrl: string;
  requiredReferral: 10;
};

export type FriendListResponse = {
  referralList: Friend[];
  userRank: Rank;
};
