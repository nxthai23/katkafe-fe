import { Staff } from "./common-types";

export type Item = Staff & {
  price: number;
  configId: Staff;
};

export type BuyBody = {
  itemId: string;
};
