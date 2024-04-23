"use client";
import { deleteOneStaff } from "@/requests/staff";
import { Staff } from "@/types/common-types";
import { useState } from "react";

export const useDeleteOneStaff = () => {
    const [staff, setStaff] = useState<Staff | null>(null);

    const deleteStaff = async (id: number) => {
        try {
            const response = await deleteOneStaff(id);
            console.log("response", response);
            setStaff(response);
        } catch (error) {
            console.error("Error deleting staff", error);
        }
    };

    return { staff, deleteStaff };
};
