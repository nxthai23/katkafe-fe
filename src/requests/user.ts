import { API_USER, BASE_URL } from "@/constants/api-url";
import { UserType } from "@/types/user";
import axios from "axios";
import katAxios from "./axios.config";

export const getUser = async () => {
  const response = await axios.get(`${API_USER}`);
  return response.data;
};

export const getClaim = async () => {
  const response = await katAxios.post<UserType>(`${BASE_URL}/users/claim`);
  return response.data;
};

export const getClaimable = async () => {
  const response = await katAxios.get(`${BASE_URL}/users/claimable`);
  return response.data;
};
