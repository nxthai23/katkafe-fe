import { API_GUILD } from "@/constants/api-url";
import axios from "axios";

export const getGuilds = async () => {
  const response = await axios.get(`${API_GUILD}`);
  return response.data;
};

export const getOneGuild = async (guildId: string) => {
  const response = await axios.get(`${API_GUILD}/${guildId}`);
  return response.data;
};
