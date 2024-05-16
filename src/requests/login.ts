import { BASE_URL } from "@/constants/api-url";
import { LoginBody } from "@/types/user";
import axios from "axios";

// set up axios interceptor
export const postLogin = async (body: LoginBody) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, body);
  console.log("response", response.data);
  return response.data;
};
