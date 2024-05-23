"use client";
import { getPower, getRestaurants } from "@/requests/restaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { serverHooks } from "next/dist/server/app-render/entry-base";
import { useEffect, useState } from "react";

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

const usePower = (locationId: string) => {
  const [power, setPower] = useState(null);

  useEffect(() => {
    const fetchPower = async (id: string) => {
      try {
        const powerData = await getPower(id);
        setPower(powerData);
      } catch (error) {
        console.error("Error fetching power:", error);
        setPower(null);
      }
    };

    if (locationId) {
      fetchPower(locationId);
    } else {
      setPower(null);
    }
  }, [locationId]);

  return power;
};

export default usePower;
