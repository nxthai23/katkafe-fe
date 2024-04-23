import Button from "@/components/ui/Button";
import { useBundleStore } from "@/stores/bundleStore";
import { useCatDealStore } from "@/stores/catDealStore";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect, useState } from "react";
import CardBundle from "@/components/ui/CardBundle";
import { useFetchBundles } from "@/lib/hooks/useBundle";
import { useFetchCatDeals } from "@/lib/hooks/useCatDeal";
import CatCard from "@/components/ui/CatCard";
// import { Dialog, DialogFooter, DialogTrigger } from "@/components/ui/Dialog";
import { LogOut, MoreHorizontal } from "lucide-react";
import { DialogContent } from "@radix-ui/react-dialog";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const Shop = () => {
    const [setShowShopPanel] = useLayoutStore((state) => [
        state.setShowShopPanel,
    ]);
    const [activeTab, setActiveTab] = useState("Bundle");
    const [bundles, setCurrentBundle] = useBundleStore((state) => [
        state.bundles,
        state.setCurrentBundle,
    ]);
    const [catDeals, setCurrentCatDeal] = useCatDealStore((state) => [
        state.catDeals,
        state.setCurrentCatDeal,
    ]);

    const isActive =
        "!py-2 !-translate-y-[28px] !border-[#5e5745] !bg-[#fffeec]";
    const handleBundleTabClick = () => {
        setActiveTab("Bundle");
    };

    const handleCatTabClick = () => {
        setActiveTab("Cat");
    };

    const handleClose = () => {
        setShowShopPanel(false);
    };
    const [showDialog, setShowDialog] = useState(false);

    const toggleDialog = () => {
        console.log("bbbbbbb");

        setShowDialog(!showDialog);
    };

    const { fetchBundles } = useFetchBundles();
    const { fetchCatDeals } = useFetchCatDeals();

    useEffect(() => {
        fetchBundles();
        fetchCatDeals();
    }, []);

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
                            onClick={handleBundleTabClick}
                            className={`absolute cursor-pointer left-1/2 -translate-x-[100px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-[#5e5745] ${
                                activeTab === "Bundle" ? isActive : ""
                            }`}
                        >
                            Bundle
                        </div>
                        <div
                            onClick={handleCatTabClick}
                            className={`absolute cursor-pointer left-1/2 translate-x-[10px] border-2 px-6 py-1 bg-[#edc6a9] border-[#edc6a9] -translate-y-[20px] rounded-t-xl text-[#5e5745] ${
                                activeTab === "Cat" ? isActive : ""
                            }`}
                        >
                            Cat
                        </div>
                    </div>
                    <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
                        <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
                        <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
                        <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
                    </span>
                    {activeTab === "Cat" && (
                        <div className="bg-[#fffeec] rounded-b-[20px] flex flex-wrap justify-center rounded-t border border-[#b5b5b5] w-full overflow-y-auto h-[calc(100%-32px)] p-4 mt-8">
                            <div className="bg-[url('/images/bg-name.png')] w-[170px] h-[35px] bg-contain bg-center bg-no-repeat text-center mb-6">
                                <div className="text-center uppercase">
                                    deal of the day
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap gap-10 justify-center">
                                {catDeals.map((catDeal) => (
                                    <div
                                        key={catDeal.id}
                                        className="flex flex-col items-center gap-4"
                                    >
                                        <div className="w-[100px] h-[130px]">
                                            <CatCard cat={catDeal} />
                                        </div>
                                        <div className="w-[88px] h-[30px]">
                                            <Button>{catDeal.price} $</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === "Bundle" && (
                        <div
                            className="bg-[#fffeec] rounded-b-[20px] rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-4 overflow-y-auto mt-8 w-full flex flex-col justify-between"
                            style={{
                                scrollbarWidth: "thin",
                                scrollbarColor: "#666666 #ffe",
                            }}
                        >
                            <div className="flex flex-col gap-2">
                                {bundles.map((bundle) => (
                                    <div
                                        key={bundle.id}
                                        className="w-full h-full cursor-pointer"
                                    >
                                        <CardBundle
                                            bundle={bundle}
                                            handleClick={toggleDialog}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showDialog && (
                <>
                    <div className="bg-[#807f76] opacity-70 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"></div>
                    <ConfirmDialog />
                </>
            )}
        </div>
    );
};

export default Shop;
