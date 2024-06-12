import { API_RESTAURANTS, API_RESTAURANT, BASE_URL } from "@/constants/api-url";
import axios from "axios";
import katAxios from "./axios.config";
import {
  AssignBody,
  RemoveBody,
  RequireUpgradeBody,
  UpgradeBody,
} from "@/types/restaurant";

export const getRestaurants = async () => {
  const response = await katAxios.get(`${BASE_URL}/locations`);
  return response.data;
};
export const getRestaurant = async () => {
  const response = await axios.get(`${API_RESTAURANT}`);
  return response.data;
};

export const deleteOneStaffOfRestaurant = async (id: number) => {
  const response = await axios.delete(`${API_RESTAURANT}/staff/${id}`);
  return response.data;
};

export const assignCat = async (body: AssignBody) => {
  const response = await katAxios.post(`${BASE_URL}/locations/assign`, body);
  return response.data;
};

export const getPower = async (locationId: string) => {
  const response = await katAxios.get(
    `${BASE_URL}/locations/power/${locationId}`
  );
  return response.data;
};

export const removeCat = async (body: RemoveBody) => {
  const response = await katAxios.post(`${BASE_URL}/locations/remove`, body);
  return response.data;
};

export const upgradeRestaurant = async (body: UpgradeBody) => {
  const response = await katAxios.post(`${BASE_URL}/locations/upgrade`, body);
  return response.data;
};

export const upgradeRequireRestaurant = async (body: RequireUpgradeBody) => {
  const response = await katAxios.post(
    `${BASE_URL}/location-upgrade/next-level`,
    body
  );
  return response.data;
};
