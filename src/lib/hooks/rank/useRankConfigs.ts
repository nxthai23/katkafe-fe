"use client";
import { getRankConfig } from "@/requests/rank";
import { Rank } from "@/types/friend";
import { useEffect, useState } from "react";

export const useRankConfigs = (): [Rank[], () => Promise<void>] => {
  const [rankConfigs, setRankConfigs] = useState<Rank[]>([]);

  const fetchRankConfigs = async () => {
    try {
      const response = await getRankConfig();
      console.log("Rank Configs", response);
      setRankConfigs(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchRankConfigs();
  }, []);

  return [rankConfigs, fetchRankConfigs];
};
