import { getGuilds, getOneGuild } from "@/requests/guild";
import { useGuildStore } from "@/stores/guild/guildStore";
import guildsData from "@/mock-data/guilds.json";

export const useFetchGuilds = () => {
  const [setGuilds] = useGuildStore((state) => [state.setGuilds]);

  const fetchGuilds = async () => {
    try {
      // const response = await getGuilds();
      setGuilds(guildsData.guilds as any);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchGuilds,
  };
};

export const useFetchOneGuild = () => {
  const setGuild = useGuildStore((state) => state.setGuild);

  const fetchOneGuild = async (guildId: string) => {
    try {
      const response = await getOneGuild(guildId);
      setGuild(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchOneGuild,
  };
};
