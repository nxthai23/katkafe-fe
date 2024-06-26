import { BASE_URL } from "@/constants/api-url";
import katAxios from "./axios.config";
import { Rank } from "@/types/friend";

export const getRankConfig = async () => {
  const response = await katAxios.get<Rank[]>(`${BASE_URL}/rank-config`);
  return response.data;
};
