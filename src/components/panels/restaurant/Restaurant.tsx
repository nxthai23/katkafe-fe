import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLayoutStore } from "@/stores/layoutStore";
import { useFetchRestaurants } from "@/lib/hooks/restaurant/useRestaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import RestaurantCard from "@/components/ui/RestaurantCard";
import { Pagination } from "@/components/ui/Pagination";
import { divide } from "lodash";
import UnlockRestaurantCard from "@/components/ui/UnlockRestaurantCard";

const itemsPerPage = 2;

function Restaurant() {
  const [setShowRestaurantPanel] = useLayoutStore((state) => [
    state.setShowRestaurantPanel,
  ]);
  const [restaurants] = useRestaurantStore((state) => [state.restaurants]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRestaurants =
    startIndex >= restaurants.length
      ? []
      : restaurants.slice(startIndex, endIndex) || [];

  console.log(restaurants);
  const { fetchRestaurants } = useFetchRestaurants();

  const handleBack = () => {
    setShowRestaurantPanel(false);
  };
  const handleClick = () => {
    console.log("Unlock");
    setShowRestaurantPanel(false);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);
  return (
    <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
          <div className="absolute -left-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/back.png"
              alt="cat pic"
              width={32}
              height={32}
              onClick={handleBack}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-[#5e5745] bg-[#fffeec] rounded-t-xl text-[#5e5745]">
            Coffee spot
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>
          <div className="w-full flex flex-col gap-2 bg-[#fffeec] rounded-b-[20px] rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-4 overflow-hidden mt-8">
            {currentRestaurants.map((restaurant) => (
              <>
                <div
                  key={restaurant.id}
                  className="border border-[#cccbbd] bg-[#fffeec] p-2 rounded-lg"
                  style={{ boxShadow: "0px -4px 0px 0px #cccbbd inset" }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
              </>
            ))}
            {currentPage ===
              Math.ceil((restaurants.length + 1) / itemsPerPage) && (
              <div
                className="border border-[#cccbbd] bg-[#F7F6E2] p-2 py-8 rounded-lg"
                style={{ boxShadow: "0px -4px 0px 0px #cccbbd inset" }}
              >
                <UnlockRestaurantCard onUnlock={handleClick} />
              </div>
            )}
            <Pagination
              onPageClick={handlePageClick}
              customClassName="flex justify-center absolute bottom-2 w-full left-1/2 -translate-x-1/2"
              currentPage={currentPage}
              totalPages={Math.ceil((restaurants.length + 1) / itemsPerPage)}
              onClickNextPage={handleNextPage}
              onClickPrevPage={handlePrevPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;