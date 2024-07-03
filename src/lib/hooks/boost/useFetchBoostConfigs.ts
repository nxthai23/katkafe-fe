import { getBoostConfig } from "@/requests/boost/boost-config";
import { BoostConfig } from "@/types/boost";
import { useState } from "react";

export const useFetchBoostConfig = () => {
  const [boostConfigs, setBoostConfigs] = useState<BoostConfig[]>([]);

  const fetchBoostConfigs = async () => {
    try {
      const response = await getBoostConfig();
      setBoostConfigs(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    boostConfigs,
    fetchBoostConfigs,
  };
};
