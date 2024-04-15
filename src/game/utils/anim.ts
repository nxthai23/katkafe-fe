import { CAT_CHANGE_DISPLAY_LEVELS } from "@/constants/config";
import { Cat } from "@/types/cat";

export const getCatSpriteByLevel = (cat: Cat) => {
    for (let i = 1; i < CAT_CHANGE_DISPLAY_LEVELS.length; i++) {
        const config = CAT_CHANGE_DISPLAY_LEVELS[i];
        const lastConfig = CAT_CHANGE_DISPLAY_LEVELS[i - 1];
        if (
            cat.level >= lastConfig.level &&
            cat.level < config.level &&
            config.type !== "none"
        ) {
            return `Cat-${cat.assetId}-${config.type}`;
        }
    }
    return `Cat-${cat.assetId}`;
};
