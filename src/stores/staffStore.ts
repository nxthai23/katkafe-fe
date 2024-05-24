import { Staff } from "@/types/common-types";
import { create } from "zustand";

type States = {
  staffs: Staff[];
  currentStaff: Staff | null;
  autoActives: number;
  isOneAssign: boolean;
};

type Actions = {
  setStaffs: (staffs: Staff[]) => void;
  setCurrentStaff: (staff: Staff) => void;
  setAutoActives: (number: number) => void;
  setIsOneAssign: (value: boolean) => void;
};

const defaultStates: States = {
  currentStaff: null,
  staffs: [],
  autoActives: 0,
  isOneAssign: true,
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
}));
