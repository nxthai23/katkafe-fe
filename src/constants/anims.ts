export const CAT_ANIMATIONS = {
    IDLE: "idle",
    WALKING_DOWN: "walking-down",
    WALKING_UP: "walking-up",
    WALKING_LEFT: "walking-left",
    WALKING_RIGHT: "walking-right",
    SLEEP: "sleep",
};

export const CAT_STATES = {
    IDLE: "idle",
    WALKING: "walking",
    SLEEP: "sleep",
};

export const RANDOM_CAT_STATES = [
    CAT_STATES.IDLE,
    CAT_STATES.WALKING,
    CAT_STATES.SLEEP,
];

export enum CAT_DIRECTIONS {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export const GUEST_STATES = {
    IDLE: "idle",
    ARRIVING: "arrive",
    ORDERING: "ordering",
    LEAVING: "leaving",
};

//Total percentage = 100%
export const CAT_ANIM_PERCENTAGE = {
    [CAT_STATES.IDLE]: 40,
    [CAT_STATES.WALKING]: 50,
    [CAT_STATES.SLEEP]: 10,
};

