import { Staff } from "./common-types";

export type CatDeal = Staff & {
  price: number;
  configId: Staff;
};

export type BuyBody = {
  itemId: string;
};

// export type CatConfig = Staff;
