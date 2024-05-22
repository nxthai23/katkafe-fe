import { API_STAFF, BASE_URL } from "@/constants/api-url";
import { Staff } from "@/types/common-types";
import axios from "axios";
import katAxios from "./axios.config";

export const getStaffs = async () => {
  const response = await katAxios.get<Staff[]>(`${BASE_URL}/cats`);
  return response.data;
};

export const getOneStaff = async (id: string) => {
  const response = await katAxios.get<Staff>(`${BASE_URL}/cats/${id}`);
  return response.data;
};

export const deleteOneStaff = async (id: number) => {
  const response = await axios.delete(`${API_STAFF}/${id}`);
  return response.data;
};
