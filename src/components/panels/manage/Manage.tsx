import React, { useState } from "react";
import Button from "../../ui/Button";
import { useRestaurants } from "@/lib/hooks/useRestaurant";
import StaffCard from "../../ui/StaffCard";
import Image from "next/image";
import StaffAssign from "../staff/UserStaffAssign";
import CardInfo from "@/components/ui/CardInfo";
import { useDeleteOneStaffOfRestaurant } from "@/lib/hooks/useDeleteOneStaffOfRestaurant";
import { useLayoutStore } from "@/stores/layoutStore";
import { Staff } from "@/types/common-types";
import { useStaffStore } from "@/stores/staffStore";

const Manage: React.FC = () => {
  const [setShowManagePanel] = useLayoutStore((state) => [
    state.setShowManagePanel,
  ]);
  const [setCurrentStaff] = useStaffStore((state) => [state.setCurrentStaff]);
  const [showStaffPanel, setShowStaffPanel] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("Cafe");

  const handleClose = () => {
    setShowManagePanel(false);
  };
  const restaurants = useRestaurants();

  const isActive = "!py-2 !-translate-y-[28px] !border-[#5e5745] !bg-[#fffeec]";

  const handleCafeTabClick = () => {
    setActiveTab("Cafe");
  };

  const handleStaffTabClick = () => {
    setActiveTab("Staff");
  };

  const toggleStaffPanel = () => {
    setShowStaffPanel(!showStaffPanel);
  };

  const handleCardClick = (index: number) => {
    setActiveCard(index === activeCard ? null : index);
  };
  const handleViewClick = (staff: Staff) => {
    setShowCardInfo(!showCardInfo);
    setCurrentStaff(staff);
  };
  const { deleteStaffOfRestaurant } = useDeleteOneStaffOfRestaurant();
  const handleRemoveClick = async (staffId: number) => {
    try {
      await deleteStaffOfRestaurant(staffId);
      // dispatch(useRestaurants());
      alert("Staff deleted successfully!");
    } catch (error) {
      console.error("Error removing staff", error);
      alert("Failed to delete staff. Please try again.");
    }
  };

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="flex">
            <div
              onClick={handleCafeTabClick}
              className={`absolute cursor-pointer left-1/2 -translate-x-[100px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-[#5e5745] ${
                activeTab === "Cafe" ? isActive : ""
              }`}
            >
              Cafe
            </div>
            <div
              onClick={handleStaffTabClick}
              className={`absolute cursor-pointer left-1/2 translate-x-[10px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-[#5e5745] ${
                activeTab === "Staff" ? isActive : ""
              }`}
            >
              Staff
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>
          {activeTab === "Staff" && (
            <div className="bg-[#fff8de] rounded-b-[20px] flex flex-col justify-between rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8">
              <div className="">
                {restaurants.map((restaurant) => (
                  <>
                    <div
                      key={restaurant.id}
                      className="flex justify-center flex-wrap gap-x-2 gap-y-4 mt-2"
                    >
                      {[...Array(Number(restaurant.numberStaff))].map(
                        (_, index) =>
                          !restaurant.staff[index] ? (
                            <img
                              key={index}
                              src="/images/empty-cat.png"
                              alt="Empty Cat"
                              className="w-[100px] h-[130px] cursor-pointer"
                              onClick={toggleStaffPanel}
                            />
                          ) : (
                            <div
                              key={index}
                              className="w-[100px] h-[130px]"
                              onClick={() => handleCardClick(index)}
                            >
                              <StaffCard
                                onRemoveClick={handleRemoveClick}
                                onViewClick={() =>
                                  handleViewClick(restaurant.staff[index])
                                }
                                cat={restaurant.staff[index]}
                                active={index === activeCard}
                              />
                            </div>
                          )
                      )}
                    </div>
                  </>
                ))}
              </div>
              <div>
                <hr className="mt-4 my-2 border-[#e8ddbd]" />
                <div className="flex gap-2 justify-center">
                  {["Remove all", "Auto deploy"].map((item, index) => (
                    <div key={index} className="w-[156px] h-[39px]">
                      <Button>{item}</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "Cafe" && (
            <div className="bg-[#fff8de] rounded-b-[20px] rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8 w-full flex flex-col justify-between">
              <div className="gap-6">
                {restaurants.map((restaurant) => (
                  <>
                    <div>
                      <Image
                        src={restaurant.imageUrl}
                        alt="cat pic"
                        width={312}
                        height={200}
                        className="flex aspect-[312/200] !rounded"
                      />
                    </div>
                    <div className="bg-[url('/images/bg-name.png')] h-[42px] bg-contain bg-center bg-no-repeat text-center -translate-y-[30px]">
                      <div>{restaurant.name}</div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span>Total SPD</span>
                        <span className="flex items-center gap-1">
                          <img src="/images/coin.png" alt="" />
                          {restaurant.totalSPB}/s
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shop level</span>
                        <span>{restaurant.level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Staff slot</span>
                        <span>{restaurant.staffSlot}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Upgrade Fee</span>
                        {/* TODO: chưa có API */}
                        <span className="flex items-center gap-1">
                          <img src="/images/coin.png" alt="" />
                          12M
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total SPD</span>
                        <span className="flex items-center gap-1">
                          <img src="/images/coin.png" alt="" />
                          {restaurant.balance}M
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div>
                <hr className="mt-4 my-2 border-[#e8ddbd]" />
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Upgrade"].map((item, index) => (
                    <div key={index} className="w-[172px] h-[39px]">
                      <Button>{item}</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {showStaffPanel && (
          <div className="absolute z-30 w-full h-full top-0 left-0">
            <StaffAssign showStaffPanel={setShowStaffPanel} />
          </div>
        )}
        {showCardInfo && (
          <div className="absolute z-30 w-full h-full top-0 left-0">
            <CardInfo onClose={() => setShowCardInfo(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Manage;
