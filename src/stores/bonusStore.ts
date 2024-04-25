import { Bonus } from "@/types/bonus";
import { create } from "zustand";

type States = {
  bonuss: Bonus[];
  currentBonus: Bonus | null;
};

type Actions = {
  setBonuss: (bonuss: Bonus[]) => void;
  setCurrentBonus: (bonus: Bonus) => void;
};

const defaultStates = {
  currentBonus: null,
  bonuss: [],
};

export const useBonusStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setBonuss: (bonuss: Bonus[]) => {
    set({
      bonuss,
    });
  },
  setCurrentBonus: (bonus: Bonus) => {
    set({
      currentBonus: bonus,
    });
  },
}));
