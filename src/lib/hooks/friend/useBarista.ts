"use client";
import { getBaristas } from "@/requests/barista";
import { useBaristaStore } from "../../../stores/friend/baristaStore";
import baristasData from "@/mock-data/baristas.json";

export const useFetchBaristas = () => {
  const [setBaristas] = useBaristaStore((state) => [state.setBaristas]);

  const fetchBaristas = async () => {
    try {
      // const response = await getBaristas();
      setBaristas(baristasData.baristas);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchBaristas,
  };
};
