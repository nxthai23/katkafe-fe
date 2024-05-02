"use client";
import { getBonuss } from "@/requests/bonus";
import { useBonusStore } from "../../stores/bonusStore";

export const useFetchBonuss = () => {
  const [setBonuss] = useBonusStore((state) => [state.setBonuss]);

  const fetchBonuss = async () => {
    try {
      const response = await getBonuss();
      setBonuss(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchBonuss,
  };
};
