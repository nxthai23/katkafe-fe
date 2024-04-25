import { API_BRONZE_RANK } from "@/constants/api-url";
import { BronzeRank } from "@/types/bronzeRank";
import axios from "axios";

export const getBronzeRanks = async () => {
    const response = await axios.get<BronzeRank[]>(`${API_BRONZE_RANK}`);
    return response.data;
};
