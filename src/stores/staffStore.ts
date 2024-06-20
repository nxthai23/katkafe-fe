import { set } from "lodash";
import { Staff } from "@/types/common-types";
import { create } from "zustand";

type States = {
  staffs: Staff[];
  currentStaff: Staff | null;
  autoActives: number;
  isOneAssign: boolean;
  numberCatRequire: number;
  numberCatPick: number;
  fee: number;
  isChooseUpgrade: string[];
  speed: number;
};

type Actions = {
  setStaffs: (staffs: Staff[]) => void;
  setCurrentStaff: (staff: Staff) => void;
  setAutoActives: (number: number) => void;
  setIsOneAssign: (value: boolean) => void;
  setNumberCatRequire: (number: number) => void;
  setNumberCatPick: (number: number) => void;
  setFee: (number: number) => void;
  setSpeed: (number: number) => void;
  setIsChooseUpgrade: (value: string[]) => void;
};

const defaultStates: States = {
  currentStaff: null,
  staffs: [],
  autoActives: 0,
  isOneAssign: true,
  numberCatRequire: 0,
  numberCatPick: 0,
  fee: 0,
  isChooseUpgrade: [],
  speed: 0,
};

export const useStaffStore = create<States & Actions>((set, get) => ({
  ...defaultStates,
  setStaffs: (staffs: Staff[]) => {
    set({
      staffs,
    });
  },
  setCurrentStaff: (staff: Staff) => {
    set({
      currentStaff: staff,
    });
  },
  setAutoActives: (number: number) => {
    set({
      autoActives: number,
    });
  },
  setIsOneAssign: (value: boolean) => {
    set({
      isOneAssign: value,
    });
  },
  setNumberCatRequire: (number: number) => {
    set({
      numberCatRequire: number,
    });
  },
  setNumberCatPick: (number: number) => {
    set({
      numberCatPick: number,
    });
  },
  setFee: (number: number) => {
    set({
      fee: number,
    });
  },
  setIsChooseUpgrade: (value: string[]) => {
    set({
      isChooseUpgrade: value,
    });
  },
  setSpeed: (number: number) => {
    set({
      speed: number,
    });
  },
}));
