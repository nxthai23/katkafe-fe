import { API_RESTAURANTS, API_RESTAURANT, BASE_URL } from "@/constants/api-url";
import axios from "axios";
import katAxios from "./axios.config";
import { UserType } from "@/types/user";
import { AssignBody } from "@/types/restaurant";

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
  console.log("Assigning Staff ID1111111: ", body);
  try {
    const response = await katAxios.post(`${BASE_URL}/locations/assign`, body);
    return response.data;
  } catch (error) {
    console.error("Error updating location", error);
  }
};
