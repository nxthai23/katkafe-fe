export type BronzeRank = {
  id: number;
  title: string;
  imageUrl: string;
  balance: string;
  totalPeople: number;
  people: Friend[];
};

export type Friend = {
  id: string;
  name: string;
  imageUrl: string;
  balance: number;
  totalFriend: number;
};
