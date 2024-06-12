"use client";
import { getBonuses } from "@/requests/bonus";
import { useBonusStore } from "../../../stores/friend/bonusStore";

export const useFetchBonuses = () => {
  const [setBonuses] = useBonusStore((state) => [state.setBonuses]);

  const fetchBonuses = async () => {
    try {
      const response = await getBonuses();
      setBonuses(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchBonuses,
  };
};
