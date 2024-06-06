"use client";
import { getStaffs } from "@/requests/staff";
import { useStaffStore } from "@/stores/staffStore";
import staffsData from "@/mock-data/staffs.json";

export const useFetchStaffs = () => {
  const [setStaffs] = useStaffStore((state) => [state.setStaffs]);

  const fetchStaffs = async () => {
    try {
      // const response = await getStaffs();
      setStaffs(staffsData.staffs);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchStaffs,
  };
};
