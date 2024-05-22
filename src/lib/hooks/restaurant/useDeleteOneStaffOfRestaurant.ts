"use client";
import { deleteOneStaffOfRestaurant } from "@/requests/restaurant";
import { deleteOneStaff } from "@/requests/staff";
import { Staff } from "@/types/common-types";
import { useState } from "react";

export const useDeleteOneStaffOfRestaurant = () => {
  const [staff, setStaff] = useState<Staff | null>(null);

  const deleteStaffOfRestaurant = async (id: number) => {
    try {
      const response = await deleteOneStaffOfRestaurant(id);
      setStaff(response);
    } catch (error) {
      console.error("Error deleting staff", error);
    }
  };

  return { staff, deleteStaffOfRestaurant };
};
