"use client";
import { getRestaurants } from "@/requests/restaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";

export const useFetchRestaurants = () => {
  const [setRestaurants, setCurrentRestaurant] = useRestaurantStore((state) => [
    state.setRestaurants,
    state.setCurrentRestaurant,
  ]);

  const fetchRestaurants = async () => {
    try {
      const response = await getRestaurants();
      setRestaurants(response);
      setCurrentRestaurant(response[0]);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRestaurants,
  };
};
