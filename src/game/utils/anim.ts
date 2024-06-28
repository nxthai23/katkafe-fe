import { Staff } from "@/types/common-types";

export const getCatSpriteByLevel = (cat: Staff) => {
  const catName = cat.assetName;
  switch (cat.numberStar) {
    default:
    case 1:
      return `Cat-${catName}-base`;
    case 2:
      return `Cat-${catName}-apron`;
    case 3:
      return `Cat-${catName}-coat`;
  }
};
