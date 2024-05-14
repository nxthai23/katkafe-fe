"use client";
import { getRestaurant } from "@/requests/restaurant";
import { Restaurant } from "@/types/common-types";
import { useEffect, useState } from "react";

export const useRestaurants = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await getRestaurant();
                setRestaurants(response);
            } catch (error) {
                console.error("Error fetching", error);
            }
        };

        fetchRestaurants();
    }, []);

    return restaurants;
};
