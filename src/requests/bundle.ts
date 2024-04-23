import { API_BUNDLE } from "@/constants/api-url";
import axios from "axios";

export const getBundles = async () => {
    const response = await axios.get(`${API_BUNDLE}`);
    return response.data;
};
