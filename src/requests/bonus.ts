import { API_BONUS } from "@/constants/api-url";
import axios from "axios";

export const getBonuses = async () => {
  const response = await axios.get(`${API_BONUS}`);
  return response.data;
};
