import Button from "@/components/ui/Button";
import { useItemStore } from "@/stores/shop/itemStore";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect, useState } from "react";
import CatCard from "@/components/ui/CatCard";
import RewardDialog from "@/components/ui/RewardDialog";
import BundleCard from "@/components/ui/BundleCard";
import { Bundle, ShopType } from "@/types/bundle";
import { Item } from "@/types/item";
import CardInfo from "@/components/ui/CardInfo";
import { useStaffStore } from "@/stores/staffStore";
import { buyItem, getItems } from "@/requests/shop/item";
import { useUserStore } from "@/stores/userStore";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const TABS = {
  CAT: "Cat",
  ROLL: "Roll",
};

const Shop = () => {
  const [setShowShopPanel] = useLayoutStore((state) => [
    state.setShowShopPanel,
  ]);
  const [showRewardDialog, setShowRewardDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.ROLL);
  const [items, currentItem, setCurrentItem, setItems] = useItemStore(
    (state) => [
      state.items,
      state.currentItem,
      state.setCurrentItem,
      state.setItems,
    ]
  );
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [staff, setStaffs, setCurrentStaff] = useStaffStore((state) => [
    state.currentStaff,
    state.setStaffs,
    state.setCurrentStaff,
  ]);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const handleViewDetail = (item: Item) => {
    setShowCardInfo(true);
  };
  const [showNotiBean, setShowNotiBean] = useState(false);

  const { fetchStaffs } = useFetchStaffs();

  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleClose = () => {
    setItems([]);
    setShowShopPanel(false);
  };

  const confirmBundleDialog = (bundle: Bundle) => {
    setShowRewardDialog(!showRewardDialog);
  };

  const showConfirm = (item: Item) => {
    setShowConfirmDialog(!showConfirmDialog);
    setCurrentItem(item);
  };
  const handleBuyItem = async (item: Item) => {
    if (item) {
      setCurrentItem(item);
    }
    if (!user) return;
    if (Number(user.bean) < item.price) {
      setShowNotiBean(true);
      setTimeout(() => {
        setShowNotiBean(false);
      }, 1000);
      return;
    }
    try {
      if (!user || !item) return;
      const body = {
        itemId: item._id,
      };
      const response = await buyItem(body);
      if (response) {
        setStaffs(response.user.cats);
        setUser(response.user);
        fetchStaffs();
        setCurrentStaff(response.items.cats[0]);
      }
    } catch (error) {
      console.error("Failed to buy item", error);
    }
  };

  const fetchItems = async () => {
    try {
      const type = activeTab.toLowerCase();
      const response = await getItems(type);
      setItems(response);
      return response;
    } catch (error) {
      console.error("Failed to fetch cat deals", error);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  const handleAgree = () => {
    setShowConfirmDialog(false);
    if (currentItem) {
      handleBuyItem(currentItem);
    }
    setShowRewardDialog(true);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

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
              onClick={() => handleTabClick(TABS.ROLL)}
              className={`absolute cursor-pointer left-1/2 -translate-x-[100px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === TABS.ROLL ? isActive : ""
              }`}
            >
              Roll
            </div>
            <div
              onClick={() => handleTabClick(TABS.CAT)}
              className={`absolute cursor-pointer left-1/2 translate-x-[10px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === TABS.CAT ? isActive : ""
              }`}
            >
              Cat
            </div>
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          {activeTab === TABS.CAT && (
            <div
              className="bg-orange-10 rounded-b-[20px] flex flex-wrap justify-center rounded-t border border-gray-20 w-full overflow-y-auto h-[calc(100%-32px)] p-4 mt-8"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#666666 #ffe",
              }}
            >
              <div className="bg-[url('/images/bg-name.png')] w-[170px] h-[35px] bg-contain bg-center bg-no-repeat text-center mb-6">
                <div className="text-center uppercase">deal of the day</div>
              </div>
              <div className="w-full flex flex-wrap gap-10 justify-center">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-[100px] h-[130px]">
                      <CatCard cat={item} />
                    </div>
                    <div
                      className="w-[88px] h-[30px]"
                      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                        showConfirm(item)
                      }
                    >
                      <Button>
                        {item.price || 0}
                        <img
                          className="w-4 h-4 ml-1"
                          src="./images/coin.png"
                          alt=""
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === TABS.ROLL && (
            <div
              className="bg-orange-10 rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-4 overflow-y-auto mt-8 w-full flex flex-col justify-between"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#666666 #ffe",
              }}
            >
              <div className="flex flex-col gap-2">
                {/* {bundles.map((bundle) => (
                  <div key={bundle.id} className="w-full h-full cursor-pointer">
                    <BundleCard
                      bundle={bundle}
                      handleClick={confirmBundleDialog}
                    />
                  </div>
                ))} */}
              </div>
            </div>
          )}
        </div>
      </div>
      {showRewardDialog && (
        <>
          <div className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-40"></div>
          <RewardDialog
            type={activeTab === TABS.ROLL ? ShopType.Roll : ShopType.Cat}
            onClose={() => setShowRewardDialog(false)}
            closeShopPanel={() => setShowShopPanel(false)}
            button={{ type: "coin" }}
            handleChooseDetail={handleViewDetail}
          />
        </>
      )}
      {showConfirmDialog && (
        <>
          <div className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-40"></div>
          <ConfirmDialog onCancel={handleCancel} onAgree={handleAgree} />
        </>
      )}
      {showCardInfo && (
        <div className="absolute z-50 w-full h-full top-0 left-0">
          <CardInfo onBack={() => setShowCardInfo(false)} />
        </div>
      )}
      {showNotiBean && (
        <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
          Not enough bean!
        </div>
      )}
    </div>
  );
};

export default Shop;
