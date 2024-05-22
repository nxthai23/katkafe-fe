export type Restaurant = {
  staff: any;
  id: number;
  name: string;
  level: number;
  imageUrl: string;
  maxSlot: any;
  totalSPB: number;
  staffSlot: number;
  balance: number;
};

export type Staff = {
  _id: string;
  name: string;
  level: number;
  imgUrl: string;
  numberStar: number;
  backgroundUrl: string;
  isAssign: boolean;
};
