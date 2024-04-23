import { Staff } from "@/types/common-types";
import { create } from "zustand";

type States = {
    staffs: Staff[];
    currentStaff: Staff | null;
};

type Actions = {
    setStaffs: (staffs: Staff[]) => void;
    setCurrentStaff: (staff: Staff) => void;
};

const defaultStates = {
    currentStaff: null,
    staffs: [],
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
}));
