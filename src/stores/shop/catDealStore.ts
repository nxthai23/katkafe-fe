import { CatDeal } from "@/types/catDeal";
import { create } from "zustand";

type States = {
    catDeals: CatDeal[];
    currentCatDeal: CatDeal | null;
};

type Actions = {
    setCatDeals: (catDeals: CatDeal[]) => void;
    setCurrentCatDeal: (catDeal: CatDeal) => void;
};

const defaultStates = {
    catDeals: [],
    currentCatDeal: null,
};

export const useCatDealStore = create<States & Actions>((set, get) => ({
    ...defaultStates,
    setCatDeals: (catDeals: CatDeal[]) => {
        set({
            catDeals,
        });
    },
    setCurrentCatDeal: (catDeal: CatDeal) => {
        set({
            currentCatDeal: catDeal,
        });
    },
}));
