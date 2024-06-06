"use client";
import { getCatDeals } from "@/requests/catDeal";
import { useCatDealStore } from "@/stores/shop/catDealStore";
import catDealsData from "@/mock-data/catDeals.json";

export const useFetchCatDeals = () => {
  const [setCatDeals] = useCatDealStore((state) => [state.setCatDeals]);

  const fetchCatDeals = async () => {
    try {
      //

      setCatDeals(catDealsData.catDeals);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchCatDeals,
  };
};
