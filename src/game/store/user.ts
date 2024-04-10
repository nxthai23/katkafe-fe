class UserStore {
    currentLocation: number;

    constructor() {
        this.currentLocation = 1;
    }
}

export const userStore = new UserStore();