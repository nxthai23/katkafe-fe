"use client";
import { getBundles } from "@/requests/bundle";
import { useBundleStore } from "@/stores/shop/bundleStore";
import bundlesData from "@/mock-data/bundles.json";

export const useFetchBundles = () => {
  const [setBundles] = useBundleStore((state) => [state.setBundles]);

  const fetchBundles = async () => {
    try {
      // const response = await getBundles();
      setBundles(bundlesData.bundles as any);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchBundles,
  };
};
