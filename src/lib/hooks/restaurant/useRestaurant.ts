"use client";
import { getRestaurants } from "@/requests/restaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import restaurantsData from "@/mock-data/restaurants.json";

export const useFetchRestaurants = () => {
  const [setRestaurants] = useRestaurantStore((state) => [
    state.setRestaurants,
  ]);

  const fetchRestaurants = async () => {
    try {
      // const response = await getRestaurants();
      setRestaurants(restaurantsData.restaurants);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRestaurants,
  };
};
