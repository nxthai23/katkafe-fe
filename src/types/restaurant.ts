import { Staff } from "./common-types";

export type Restaurant = {
  _id: string;
  name: string;
  level: number;
  imgUrl: string;
  maxSlot: string;
  slot: string;
  totalSPB: number;
  staffSlot: number;
  balance: number;
  cats: string[];
};

export type AssignBody = {
  locationId: string;
  catIds: string[];
};

export type RemoveBody = {
  catIds?: string[];
  locationId: string;
  removeAll?: boolean;
};
