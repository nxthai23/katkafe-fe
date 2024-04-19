"use client";
import { getStaff } from "@/requests/staff";
import { Staff } from "@/types/common-types";
import { useEffect, useState } from "react";

export const useStaffs = () => {
    const [staffs, setStaffs] = useState<Staff[]>([]);

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await getStaff();
                setStaffs(response);
            } catch (error) {
                console.error("Error fetching", error);
            }
        };

        fetchStaffs();
    }, []);

    return staffs;
};
