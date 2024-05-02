import { Rank } from "@/types/rank";
import { create } from "zustand";

type States = {
  ranks: Rank[];
  currentRank: Rank | null;
};

type Actions = {
  setRanks: (ranks: Rank[]) => void;
  setCurrentRank: (rank: Rank) => void;
};

const defaultStates = {
  currentRank: null,
  ranks: [],
};

export const useRankStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setRanks: (ranks: Rank[]) => {
    set({
      ranks,
    });
  },
  setCurrentRank: (rank: Rank) => {
    set({
      currentRank: rank,
    });
  },
}));
