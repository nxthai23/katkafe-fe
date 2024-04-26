import { Guild } from "@/types/guild";
import { create } from "zustand";

type States = {
  guilds: Guild[];
  currentGuild: Guild | null;
};

type Actions = {
  setGuilds: (guilds: Guild[]) => void;
  setCurrentGuild: (guild: Guild) => void;
};

const defaultStates = {
  guilds: [],
  currentGuild: null,
};

export const useGuildStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setGuilds: (guilds: Guild[]) => {
    set({
      guilds,
    });
  },
  setCurrentGuild: (guild: Guild) => {
    set({
      currentGuild: guild,
    });
  },
}));
