"use client";
import { getItems } from "@/requests/shop/item";
import { useItemStore } from "@/stores/shop/itemStore";

export const useFetchItems = () => {
  const [setItems] = useItemStore((state) => [state.setItems]);

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return {
    fetchItems,
  };
};
