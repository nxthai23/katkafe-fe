import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import StaffCard from "../../ui/StaffCard";
import Image from "next/image";
import StaffAssign from "../staff/UserStaffAssign";
import CardInfo from "@/components/ui/CardInfo";
import { useLayoutStore } from "@/stores/layoutStore";
import { useStaffStore } from "@/stores/staffStore";
import { useFetchRestaurants } from "@/lib/hooks/restaurant/useRestaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import { get, set } from "lodash";
import { assignCat, removeCat } from "@/requests/restaurant";
import { useUserStore } from "@/stores/userStore";
import RemoveConfirmDialog from "@/components/ui/RemoveConfirmDialog";
import { use } from "matter";

const Manage: React.FC = () => {
  const [setShowManagePanel] = useLayoutStore((state) => [
    state.setShowManagePanel,
  ]);
  const [showStaffPanel, setShowStaffPanel] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("Cafe");
  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();

  const handleClose = () => {
    setShowManagePanel(false);
  };
  const [currentRestaurant, power, setRestaurants] = useRestaurantStore(
    (state) => [state.currentRestaurant, state.power, state.setRestaurants]
  );
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showAlertRemove, setShowAlertRemove] = useState(false);
  const [showAlertAssign, setShowAlertAssign] = useState(false);
  const [showAlertAvaliable, setShowAlertAvaliable] = useState(false);
  const [staffs, setCurrentStaff] = useStaffStore((state) => [
    state.staffs,
    state.setCurrentStaff,
  ]);
  const [user] = useUserStore((state) => [state.user]);
  const [setAutoActives] = useStaffStore((state) => [state.setAutoActives]);
  const staffNotAssign = staffs
    .filter((staff) => {
      return !currentRestaurant?.cats.some((cat) => cat === staff._id);
    })
    .sort((a, b) => b.level - a.level);
  const [isOneAssign, setIsOneAssign] = useStaffStore((state) => [
    state.isOneAssign,
    state.setIsOneAssign,
  ]);
  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";

  const handleCafeTabClick = () => {
    setActiveTab("Cafe");
  };

  const handleStaffTabClick = () => {
    setActiveTab("Staff");
  };

  const toggleStaffPanel = () => {
    setIsOneAssign(true);
    setShowStaffPanel(!showStaffPanel);
  };

  const handleCardClick = (index: number) => {
    setActiveCard(index === activeCard ? null : index);
  };
  const handleViewClick = (catId: string) => {
    const staff = staffs.find((staff) => get(staff, "_id") === catId);
    if (staff) {
      setCurrentStaff(staff);
    }
    setShowCardInfo(!showCardInfo);
    setActiveCard(null);
  };
  const handleRemoveClick = async () => {
    try {
      if (
        !user ||
        !currentRestaurant ||
        user.cats.length === 0 ||
        activeCard === null
      )
        return;
      const catIdToRemove = currentRestaurant.cats[activeCard];
      const body = {
        locationId: currentRestaurant._id,
        catId: catIdToRemove,
      };
      const response = await removeCat(body);
      setRestaurants(response);
      await fetchRestaurants();
      await fetchStaffs();
      setActiveCard(null);
    } catch (error) {
      console.error("Error removing staff", error);
      alert("Failed to delete staff. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const removeAllClick = () => {
    setShowDialog(true);
  };
  const assignSuccess = async () => {
    setLoading(true);
    await fetchRestaurants();
    await fetchStaffs();
    setLoading(false);
    setActiveCard(null);
    if (!isOneAssign) {
      setShowAlertAssign(true);
      setTimeout(() => {
        setShowAlertAssign(false);
      }, 1000);
    }
  };

  const handleRemoveAll = async () => {
    try {
      if (!user || !currentRestaurant || !user.cats) return;
      setLoading(true);
      const body = {
        locationId: currentRestaurant._id,
        removeAll: true,
      };

      const response = await removeCat(body);
      setRestaurants(response);
      await fetchRestaurants();
      await fetchStaffs();
    } catch (error) {
      console.error("Error remove all", error);
    } finally {
      setLoading(false);
      setShowDialog(false);
      setShowAlertRemove(true);
      setTimeout(() => {
        setShowAlertRemove(false);
      }, 1000);
    }
  };
  const autoAssign = async () => {
    if (currentRestaurant === null) return;
    const emptySlot =
      Number(currentRestaurant.slot) - (currentRestaurant.cats.length ?? 0);
    if (emptySlot === 0) {
      setShowAlertAvaliable(true);
      setTimeout(() => {
        setShowAlertAvaliable(false);
      }, 1000);
    } else {
      setIsOneAssign(false);
      setShowStaffPanel(true);
    }
  };

  useEffect(() => {
    fetchRestaurants();
    fetchStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
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
              className={`absolute cursor-pointer left-1/2 -translate-x-[100px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === "Cafe" ? isActive : ""
              }`}
            >
              Cafe
            </div>
            <div
              onClick={handleStaffTabClick}
              className={`absolute cursor-pointer left-1/2 translate-x-[10px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === "Staff" ? isActive : ""
              }`}
            >
              Staff
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          {activeTab === "Staff" && (
            <div className="bg-[#fffeec] rounded-b-[20px] flex flex-col justify-between rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8">
              <div className="flex items-center bg-orange-20 border border-[#dddcc9] w-fit px-4 rounded relative mx-auto my-2">
                {power} / s
                <span className="absolute top-1/2 -translate-y-1/2 -left-[10px]">
                  <img src="./images/speed.png" alt="" className="w-6 h-6" />
                </span>
              </div>
              <div className="h-[calc(100%-26px-8px)] overflow-y-auto">
                <>
                  <div
                    key={currentRestaurant?._id}
                    className="flex flex-wrap gap-x-2 gap-y-4 mt-2 h-full"
                  >
                    {Array.from(Array(currentRestaurant?.slot)).map(
                      (_, index) =>
                        !currentRestaurant?.cats[index] ? (
                          <>
                            <div className="relative h-fit">
                              <img
                                key={index}
                                src="/images/empty-cat.png"
                                alt="Empty Cat"
                                className="w-[100px] h-[130px]"
                              />
                              <img
                                src="/images/plus.png"
                                alt=""
                                className="absolute left-1/2 -translate-x-1/2 bottom-3 cursor-pointer"
                                onClick={toggleStaffPanel}
                              />
                            </div>
                          </>
                        ) : (
                          <div
                            key={index}
                            className="w-[100px] h-[130px]"
                            onClick={() => handleCardClick(index)}
                          >
                            <StaffCard
                              onRemoveClick={handleRemoveClick}
                              onViewClick={() =>
                                handleViewClick(currentRestaurant.cats[index])
                              }
                              catId={currentRestaurant.cats[index]}
                              active={index === activeCard}
                            />
                          </div>
                        )
                    )}
                  </div>
                </>
              </div>
              <div>
                <hr className="mt-4 my-2 border-[#e8ddbd]" />
                <div className="flex gap-2 justify-center">
                  <div className="w-[156px] h-[39px]">
                    <Button onClick={removeAllClick}>Remove All</Button>
                  </div>
                  <div className="w-[156px] h-[39px]">
                    <Button onClick={autoAssign}>Auto Assign</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Cafe" && (
            <div className="bg-[#fff8de] rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-2 overflow-hidden mt-8 w-full flex flex-col justify-between">
              <div className="gap-6">
                <div>
                  <img
                    src={currentRestaurant?.imgUrl}
                    className="w-[312px] h-[200px] !rounded"
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-bodyXl mt-2">
                    {currentRestaurant?.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <img
                      src="/images/slot_cat.png"
                      className="w-[18px] h-[18px]"
                      alt=""
                    />
                    <span>
                      {currentRestaurant?.cats.length} /{" "}
                      {currentRestaurant?.slot}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-1">
                    <span className="text-bodyMd text-[#6f6f6f]">
                      Earning Speed
                    </span>
                    <span className="flex items-center gap-1">
                      <img className="w-4 h-4" src="/images/speed.png" alt="" />
                      {power} / s
                    </span>
                  </div>
                  <hr className="border-t border-gray-20 my-2" />

                  <div className="flex flex-col">
                    <span className="text-bodyMd text-[#6f6f6f]">
                      Upgrade Fee
                    </span>
                    {/* TODO: chưa có API */}
                    <div className="flex items-center">
                      <span className="flex items-center gap-1">
                        <img
                          className="w-4 h-4"
                          src="/images/coin.png"
                          alt=""
                        />
                        12M /
                      </span>
                      <span className="flex items-center gap-1 ml-1">
                        <img
                          className="w-4 h-4"
                          src="/images/coin.png"
                          alt=""
                        />
                        123M
                      </span>
                    </div>
                  </div>
                </div>
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
            <StaffAssign
              showStaffPanel={setShowStaffPanel}
              onAssignSuccess={assignSuccess}
            />
          </div>
        )}
        {showCardInfo && (
          <div className="absolute z-30 w-full h-full top-0 left-0">
            <CardInfo onClose={() => setShowCardInfo(false)} />
          </div>
        )}
      </div>
      {showDialog && (
        <>
          <div className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"></div>
          <RemoveConfirmDialog
            handleClick={handleRemoveAll}
            onClose={() => setShowDialog(false)}
          />
        </>
      )}
      {showAlertRemove && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          Remove Successfully!
        </div>
      )}
      {showAlertAssign && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          Assign Successfully!
        </div>
      )}
      {showAlertAvaliable && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          No slot avaliable!
        </div>
      )}
    </div>
  );
};

export default Manage;
