"use client";
import { getOneStaff } from "@/requests/staff";
import { Staff } from "@/types/common-types";
import { useEffect, useState } from "react";

export const useOneStaff = (id: string) => {
  const [staff, setStaff] = useState<Staff>();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getOneStaff(id);
        setStaff(response);
      } catch (error) {
        console.error("Error fetching staff", error);
      }
    };

    fetchStaff();
  }, [id]);

  return staff;
};
