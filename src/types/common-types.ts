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
  power: string;
  assetName: string;

  //New Cat Config
  catAsset: number;
  itemAssets: {
    head: number;
    body: number;
    face: number;
    cape: number;
  };
};
