"use client";
import { getBronzeRanks } from "@/requests/bronzeRank";
import { useBronzeRankStore } from "@/stores/rankBronzeStore";

export const useFetchBronzeRanks = () => {
    const [setBronzeRanks] = useBronzeRankStore((state) => [
        state.setBronzeRanks,
    ]);

    const fetchBronzeRanks = async () => {
        try {
            const response = await getBronzeRanks();
            setBronzeRanks(response);
        } catch (error) {
            console.error("Error fetching", error);
        }
    };

    return {
        fetchBronzeRanks,
    };
};
