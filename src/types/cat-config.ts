import { Achievement } from "@/types/quest";
export type CatConfig = {
  name: string;
  assetName: string;
  description: string;
  maxLevel: number;
  power: string;
  imgUrl: string;
};

export enum CatLevelType {
  Apron = "apron",
  Coat = "coat",
  Base = "base",
}
