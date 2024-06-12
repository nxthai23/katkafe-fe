import { BASE_URL } from "@/constants/api-url";
import katAxios from "../axios.config";

export const getQuestsWithProgress = async () => {
  const response = await katAxios.get(`${BASE_URL}/quests`);
  return response.data;
};

export const checkIn = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/check-in`);
  return response.data;
};

export const visitWebsite = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/visit-website`);
  return response.data;
};

export const youtube = async () => {
  const response = await katAxios.post(`${BASE_URL}/quests/youtube`);
  return response.data;
};
