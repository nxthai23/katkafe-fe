"use client";
import { getRestaurants } from "@/requests/restaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";

export const useFetchRestaurants = () => {
  const [setRestaurants] = useRestaurantStore((state) => [
    state.setRestaurants,
  ]);

  const fetchRestaurants = async () => {
    try {
      const response = await getRestaurants();
      setRestaurants(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRestaurants,
  };
};
