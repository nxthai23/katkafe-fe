import katAxios from "../axios.config";

const BASE_URL = process.env.NEXT_PUBLIC_KATCAFE_BASE_URL
export const postTap = async (tap: number) => {
  const response = await katAxios.post(`${BASE_URL}/users/tap`, { tap });
  return response.data;
};
