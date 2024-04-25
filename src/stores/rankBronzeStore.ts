import { BronzeRank } from "@/types/bronzeRank";
import { create } from "zustand";

type States = {
    bronzeRanks: BronzeRank[];
    currentBronzeRank: BronzeRank | null;
};

type Actions = {
    setBronzeRanks: (bronzeRanks: BronzeRank[]) => void;
    setCurrentBronzeRank: (bronzeRank: BronzeRank) => void;
};

const defaultStates = {
    currentBronzeRank: null,
    bronzeRanks: [],
};

export const useBronzeRankStore = create<States & Actions>((set, get) => ({
    ...defaultStates,
    setBronzeRanks: (bronzeRanks: BronzeRank[]) => {
        set({
            bronzeRanks,
        });
    },
    setCurrentBronzeRank: (bronzeRank: BronzeRank) => {
        set({
            currentBronzeRank: bronzeRank,
        });
    },
}));
