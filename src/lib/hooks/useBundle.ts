"use client";
import { getBundles } from "@/requests/bundle";
import { useBundleStore } from "@/stores/bundleStore";

export const useFetchBundles = () => {
    const [setBundles] = useBundleStore((state) => [state.setBundles]);

    const fetchBundles = async () => {
        try {
            const response = await getBundles();
            setBundles(response);
        } catch (error) {
            console.error("Error fetching", error);
        }
    };

    return {
        fetchBundles,
    };
};
