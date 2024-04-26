"use client";
import { getRanks } from "@/requests/rank";
import { useRankStore } from "@/stores/rankStore";

export const useFetchRanks = () => {
  const [setRanks] = useRankStore((state) => [state.setRanks]);

  const fetchRanks = async () => {
    try {
      const response = await getRanks();
      setRanks(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRanks,
  };
};
