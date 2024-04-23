import { API_INVITE } from "@/constants/api-url";
import axios from "axios";

export const getInvites = async () => {
  const response = await axios.get(`${API_INVITE}`);
  return response.data;
};
