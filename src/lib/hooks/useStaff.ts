"use client";
import { getStaffs } from "@/requests/staff";
import { useStaffStore } from "@/stores/staffStore";

export const useFetchStaffs = () => {
    const [setStaffs] = useStaffStore((state) => [state.setStaffs]);

    const fetchStaffs = async () => {
        try {
            const response = await getStaffs();
            setStaffs(response);
        } catch (error) {
            console.error("Error fetching", error);
        }
    };

    return {
        fetchStaffs,
    };
};
