import { API_USER } from "@/constants/api-url";
import axios from "axios";

export const getUser = async () => {
  const response = await axios.get(`${API_USER}`);
  return response.data;
};
