import { Staff } from "./common-types";

export type Item = Staff & {
  type: string;
  price: number;
  configId: Staff;
  imgUrl?: string;
};

export type BuyBody = {
  itemId: string;
};
