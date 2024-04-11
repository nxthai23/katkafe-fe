// Default Telegram window size
export const GAME_WIDTH = 384;
export const GAME_HEIGHT = 608;

//@TODO: Load from server/config
export const LOCATIONS_COUNT = 1;
export const LOCATION_ASSETS = {
    BACKGROUND: "Floor-BG",
    BTN_FRIEND: "Button-Friend",
    BTN_GACHA: "Button-Gacha",
    BTN_PARTY: "Button-Party",
    BTN_QUEST: "Button-Quest",
    BTN_RANK: "Button-Rank",
    BTN_SWAP: "Button-Swap",
};

//@TODO: Load from server/config
export const CATS_COUNT = 1;
export const CATS_FRAME_RATE = 8;

//@TODO: Load from server/config
export const ACTIVE_AREA = {
    START_X: 32,
    END_X: 384 - 32,
    START_Y: 226 + 48,
    END_Y: 608 - 80,
};

export const CAT_MAX_SPEED = 50;
export const CAT_MIN_SPEED = 10;

export const CAT_MAX_ANIM_DURATION = 4000;
export const CAT_MIN_ANIM_DURATION = 1000;

export enum COLLISION_CATEGORIES {
    CAT = 1,
    GUEST = 2,
    OBJECTS = 3,
    WALL = 4,
}

