import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLayoutStore } from "@/stores/layoutStore";
import { useFetchRestaurants } from "@/lib/hooks/restaurant/useRestaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import RestaurantCard from "@/components/ui/RestaurantCard";
import { Pagination } from "@/components/ui/Pagination";
import { divide } from "lodash";
import UnlockRestaurantCard from "@/components/ui/UnlockRestaurantCard";
import UnlockDialog from "@/components/ui/UnlockDialog";

const itemsPerPage = 2;

function Restaurant() {
  const [setShowRestaurantPanel] = useLayoutStore((state) => [
    state.setShowRestaurantPanel,
  ]);
  const [restaurants] = useRestaurantStore((state) => [state.restaurants]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const { fetchRestaurants } = useFetchRestaurants();

  const dataUnlock = {
    title: "Unlock the coffee shop!",
    description: "To unlock this coffee shopo you'll need:",
    catOwned: 4,
    shopLevel: 9,
    fee: 20000,
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRestaurants =
    startIndex >= restaurants.length
      ? []
      : restaurants.slice(startIndex, endIndex) || [];

  const handleBack = () => {
    setShowRestaurantPanel(false);
  };
  const handleClick = () => {
    console.log("Unlock");
    setShowDialog(true);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -left-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/back.png"
              alt="cat pic"
              width={32}
              height={32}
              onClick={handleBack}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            Coffee spot
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="w-full flex flex-col gap-2 bg-orange-10 rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-4 overflow-hidden mt-8">
            {currentRestaurants.map((restaurant) => (
              <>
                <div
                  key={restaurant.id}
                  className="border border-[#cccbbd] bg-orange-10 p-2 rounded-lg"
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
      {showDialog && (
        <>
          <div className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"></div>
          <UnlockDialog
            data={dataUnlock}
            onClose={() => setShowDialog(false)}
            closeShopPanel={() => setShowRestaurantPanel(false)}
          />
        </>
      )}
    </div>
  );
}

export default Restaurant;
