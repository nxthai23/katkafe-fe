import Button from "@/components/ui/Button";
import { useBundleStore } from "@/stores/shop/bundleStore";
import { useCatDealStore } from "@/stores/shop/catDealStore";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect, useState } from "react";
import { useFetchBundles } from "@/lib/hooks/shop/useBundle";
import CatCard from "@/components/ui/CatCard";
import RewardDialog from "@/components/ui/RewardDialog";
import BundleCard from "@/components/ui/BundleCard";
import { Bundle, ShopType } from "@/types/bundle";
import { CatDeal } from "@/types/catDeal";
import CardInfo from "@/components/ui/CardInfo";
import { useStaffStore } from "@/stores/staffStore";
import { buyItem, getCatDeals } from "@/requests/shop/catDeal";
import { useUserStore } from "@/stores/userStore";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const Shop = () => {
  const [setShowShopPanel] = useLayoutStore((state) => [
    state.setShowShopPanel,
  ]);
  const [showRewardDialog, setShowRewardDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("Bundle");
  const [bundles, setCurrentBundle] = useBundleStore((state) => [
    state.bundles,
    state.setCurrentBundle,
  ]);
  const [catDeals, currentCatDeal, setCurrentCatDeal, setCatDeals] =
    useCatDealStore((state) => [
      state.catDeals,
      state.currentCatDeal,
      state.setCurrentCatDeal,
      state.setCatDeals,
    ]);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [staff, setStaffs, setCurrentStaff] = useStaffStore((state) => [
    state.currentStaff,
    state.setStaffs,
    state.setCurrentStaff,
  ]);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const handleViewDetail = (catDeal: CatDeal) => {
    setShowCardInfo(true);
  };
  const { fetchStaffs } = useFetchStaffs();
  const { fetchBundles } = useFetchBundles();

  const isActive = "!py-2 !-translate-y-[28px] !border-orange-90 !bg-orange-10";
  const handleBundleTabClick = () => {
    setActiveTab("Bundle");
  };

  const handleCatTabClick = () => {
    setActiveTab("Cat");
  };

  const handleClose = () => {
    setCatDeals([]);
    setShowShopPanel(false);
  };

  const confirmBundleDialog = (bundle: Bundle) => {
    setCurrentBundle(bundle);
    setShowRewardDialog(!showRewardDialog);
  };

  const showConfirm = (catConfig: CatDeal) => {
    setShowConfirmDialog(!showConfirmDialog);
    setCurrentCatDeal(catConfig);
  };
  const handleBuyItem = async (catConfig: CatDeal) => {
    if (catConfig) {
      setCurrentCatDeal(catConfig);
      setCurrentStaff(catConfig);
    }
    try {
      if (!user || !catConfig) return;
      const body = {
        itemId: catConfig._id,
      };
      const response = await buyItem(body);

      if (response) {
        setStaffs(response.cats);
        setUser(response);
        fetchStaffs();
      }
    } catch (error) {
      console.error("Failed to buy item", error);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  const handleAgree = () => {
    setShowConfirmDialog(false);
    if (currentCatDeal) {
      handleBuyItem(currentCatDeal);
    }
    setShowRewardDialog(true);
  };

  const dataBundle = {
    title: "Congratulation!",
    description: "You purchased Bundle's Name successfully! You received:",
  };

  const dataCat = {
    title: "Congratulation!",
    description: "You purchased a staff successfully!",
  };

  const getItems = async () => {
    try {
      const response = await getCatDeals();
      setCatDeals(response);
      return response;
    } catch (error) {
      console.error("Failed to fetch cat deals", error);
    }
  };

  useEffect(() => {
    fetchBundles();
    getItems();
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
              onClick={handleBundleTabClick}
              className={`absolute cursor-pointer left-1/2 -translate-x-[100px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === "Bundle" ? isActive : ""
              }`}
            >
              Bundle
            </div>
            <div
              onClick={handleCatTabClick}
              className={`absolute cursor-pointer left-1/2 translate-x-[10px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-orange-90 ${
                activeTab === "Cat" ? isActive : ""
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
          {activeTab === "Cat" && (
            <div className="bg-orange-10 rounded-b-[20px] flex flex-wrap justify-center rounded-t border border-gray-20 w-full overflow-y-auto h-[calc(100%-32px)] p-4 mt-8">
              <div className="bg-[url('/images/bg-name.png')] w-[170px] h-[35px] bg-contain bg-center bg-no-repeat text-center mb-6">
                <div className="text-center uppercase">deal of the day</div>
              </div>
              <div className="w-full flex flex-wrap gap-10 justify-center">
                {catDeals.map((catDeal) => (
                  <div
                    key={catDeal._id}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-[100px] h-[130px]">
                      <CatCard catDeal={catDeal} />
                    </div>
                    <div
                      className="w-[88px] h-[30px]"
                      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                        showConfirm(catDeal)
                      }
                    >
                      <Button>{catDeal.price} $</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "Bundle" && (
            <div
              className="bg-orange-10 rounded-b-[20px] rounded-t border border-gray-20 absolute z-10 h-[calc(100%-32px)] p-4 overflow-y-auto mt-8 w-full flex flex-col justify-between"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#666666 #ffe",
              }}
            >
              <div className="flex flex-col gap-2">
                {bundles.map((bundle) => (
                  <div key={bundle.id} className="w-full h-full cursor-pointer">
                    <BundleCard
                      bundle={bundle}
                      handleClick={confirmBundleDialog}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {showRewardDialog && (
        <>
          <div className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-40"></div>
          <RewardDialog
            type={activeTab === "Bundle" ? ShopType.Bundle : ShopType.Cat}
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
    </div>
  );
};

export default Shop;
