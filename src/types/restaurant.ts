import { Staff } from "./common-types";

export type Restaurant = {
  id: number;
  name: string;
  level: number;
  imageUrl: string;
  numberStaff: string;
  totalSPB: number;
  staffSlot: number;
  balance: number;
  staff: Staff[];
};
