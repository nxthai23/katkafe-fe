import { API_GUILD } from "@/constants/api-url";
import axios from "axios";

export const getGuilds = async () => {
  const response = await axios.get(`${API_GUILD}`);
  return response.data;
};
