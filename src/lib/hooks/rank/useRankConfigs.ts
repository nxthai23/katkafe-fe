"use client";
import { getRankConfig } from "@/requests/rank";
import { useLoadingStore } from "@/stores/LoadingStore";
import { Rank } from "@/types/friend";
import { useEffect, useState } from "react";

export const useRankConfigs = (): [Rank[], () => Promise<void>] => {
  const [rankConfigs, setRankConfigs] = useState<Rank[]>([]);
  const [show, hide] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const fetchRankConfigs = async () => {
    try {
      show()
      const response = await getRankConfig();
      console.log("Rank Configs", response);
      setRankConfigs(response);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      hide();
    }
  };

  useEffect(() => {
    fetchRankConfigs();
  }, []);

  return [rankConfigs, fetchRankConfigs];
};
