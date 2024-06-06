"use client";
import { getRanks } from "@/requests/rank";
import { useRankStore } from "@/stores/rank/rankStore";
import ranksData from "@/mock-data/ranks.json";

export const useFetchRanks = () => {
  const [setRanks] = useRankStore((state) => [state.setRanks]);

  const fetchRanks = async () => {
    try {
      // const response = await getRanks();
      setRanks(ranksData.ranks);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchRanks,
  };
};
