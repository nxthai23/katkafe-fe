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
  isCanUpgrade: any;
  _id: string;
  name: string;
  level: number;
  imgUrl: string;
  numberStar: number;
  backgroundUrl: string;
  rarity: object;
  power: string;
  assetName: string;
};

export const RARITY = {
  COMMON: {
    value: "COMMON",
    backgroundCard: "url('/images/card-common.png')",
    textColorClasses: "text-black",
  },
  RARE: {
    value: "RARE",
    backgroundCard: "url('/images/card-rare.png')",
    textColorClasses: "text-white",
  },
  EPIC: {
    value: "EPIC",
    backgroundCard: "url('/images/card-epic.png')",
    textColorClasses: "text-white",
  },
  SPECIAL: {
    value: "SPECIAL",
    backgroundCard: "url('/images/card-special.png')",
    textColorClasses: "text-white",
  },
};
