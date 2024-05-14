"use client";
import { getCatDeals } from "@/requests/catDeal";
import { useCatDealStore } from "@/stores/shop/catDealStore";

export const useFetchCatDeals = () => {
  const [setCatDeals] = useCatDealStore((state) => [state.setCatDeals]);

  const fetchCatDeals = async () => {
    try {
      const response = await getCatDeals();
      setCatDeals(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchCatDeals,
  };
};
