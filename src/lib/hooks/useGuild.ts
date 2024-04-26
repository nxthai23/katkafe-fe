"use client";
import { getGuilds } from "@/requests/guild";
import { useGuildStore } from "@/stores/guildStore";

export const useFetchGuilds = () => {
  const [setGuilds] = useGuildStore((state) => [state.setGuilds]);

  const fetchGuilds = async () => {
    try {
      const response = await getGuilds();
      setGuilds(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchGuilds,
  };
};
