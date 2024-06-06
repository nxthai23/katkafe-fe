"use client";
import { getBonuses } from "@/requests/bonus";
import { useBonusStore } from "../../../stores/friend/bonusStore";
import bonusesData from "@/mock-data/bonuses.json";

export const useFetchBonuses = () => {
  const [setBonuses] = useBonusStore((state) => [state.setBonuses]);

  const fetchBonuses = async () => {
    try {
      // const response = await getBonuses();
      setBonuses(bonusesData.bonuses);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchBonuses,
  };
};
