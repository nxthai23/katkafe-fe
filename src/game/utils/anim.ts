import { LAYERS } from "@/constants/layers";
import { CatAssetType } from "@/types/cat-config";
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

export const getCatItemLayer = (assetType: string) => {
  switch (assetType) {
    case CatAssetType.Hat:
      return LAYERS.CAT_HAT;
    case CatAssetType.Body:
      return LAYERS.CAT_BODY;
    case CatAssetType.Face:
      return LAYERS.CAT_FACE;
    case CatAssetType.Cape:
      return LAYERS.CAT_CAPE;
    case CatAssetType.Aura:
      return LAYERS.CAT_AURA;
    default:
      return LAYERS.CAT_BASE;
  }
};

export const getCatTextureName = (assetType: string, index: number) => {
  return `Cat-${assetType}-${index}`;
};
