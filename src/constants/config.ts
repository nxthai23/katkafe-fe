// Default Telegram window size
export const GAME_WIDTH = 384;
export const GAME_HEIGHT = 558;

// Config
export const CAT_CONFIGS = "cat-configs";

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
export const ACTIVE_AREA = {
  START_X: 32,
  END_X: 384 - 32,
  START_Y: 226 + 48,
  END_Y: 608 - 80,
};

export enum COLLISION_CATEGORIES {
  CAT = 1,
  GUEST = 2,
  OBJECTS = 3,
  WALL = 4,
}

//@TODO: Load from server/config
export const CATS_COUNT = 15;
export const CATS_FRAME_RATE = 8;

export const CAT_MAX_LEVEL = 44;
export const CAT_MAX_SPEED = 50;
export const CAT_MIN_SPEED = 10;
export const CAT_CHANGE_DISPLAY_LEVELS = [
  {
    level: 0,
    type: "none",
  },
  {
    level: 10,
    type: "Apron",
  },
];

export const GUEST_SPEED = 50;
export const MAX_GUESTS = 6;
export const GUEST_MAX_GEN_DELAY = 10000;
export const GUEST_MIN_GEN_DELAY = 3000;
export const GUEST_MAX_ORDER_DELAY = 8000;
export const GUEST_MIN_ORDER_DELAY = 3000;

export const DIALOG_MAX_GEN_DELAY = 60000;
export const DIALOG_MIN_GEN_DELAY = 20000;
export const DIALOG_MIN_DURATION = 3000;
export const DIALOG_MAX_DURATION = 8000;

export const DEFAULT_QUEST_ICON = "/images/user-task.png";
