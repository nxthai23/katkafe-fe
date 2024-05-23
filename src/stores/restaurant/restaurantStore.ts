import { getPower } from "@/requests/restaurant";
import { Restaurant } from "@/types/restaurant";
import { create } from "zustand";

type States = {
  restaurants: Restaurant[];
  currentRestaurant: Restaurant | null;
  power: any | null;
};

type Actions = {
  setRestaurants: (restaurants: Restaurant[]) => void;
  setCurrentRestaurant: (restaurant: Restaurant | null) => void;
  fetchAndSetPower: (locationId: string) => Promise<void>;
};

const defaultStates = {
  currentRestaurant: null,
  restaurants: [],
  power: null,
};

export const useRestaurantStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setRestaurants: (restaurants: Restaurant[]) => {
    set({
      restaurants,
    });
  },
  setCurrentRestaurant: (restaurant: Restaurant | null) => {
    set({
      currentRestaurant: restaurant,
    });
    if (restaurant && restaurant._id) {
      get().fetchAndSetPower(restaurant._id);
    } else {
      set({ power: null });
    }
  },
  fetchAndSetPower: async (locationId: string) => {
    try {
      const power = await getPower(locationId);
      set({ power });
    } catch (error) {
      console.error("Error fetching power:", error);
      set({ power: null });
    }
  },
}));
