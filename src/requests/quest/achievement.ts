import { API_ACHIEVEMENT } from "@/constants/api-url";
import axios from "axios";

export const getAchievements = async () => {
  const response = await axios.get(`${API_ACHIEVEMENT}`);
  return response.data;
};
