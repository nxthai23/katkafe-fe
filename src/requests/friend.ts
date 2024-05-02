import { API_FRIEND } from "@/constants/api-url";
import axios from "axios";

export const getFriends = async () => {
  const response = await axios.get(`${API_FRIEND}`);
  return response.data;
};
