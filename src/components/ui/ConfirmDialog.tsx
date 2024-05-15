import React, { useMemo, useState } from "react";
import Button from "./Button";
import { useBundleStore } from "@/stores/shop/bundleStore";
import { get } from "lodash";
import Image from "next/image";
import { ShopType } from "@/types/bundle";
import { useCatDealStore } from "@/stores/shop/catDealStore";
import CatCard from "./CatCard";
import CardInfo from "./CardInfo";
import { CatDeal } from "@/types/catDeal";

type Props = {
  type: ShopType;
  onClose?: () => void;
  closeShopPanel?: () => void;
  handleChooseDetail?: (catDeal: CatDeal) => void;
  button: {
    type: "coin" | "catDeal";
  };
};

const ConfirmDialog: React.FC<Props> = ({
  button,
  type,
  onClose,
  closeShopPanel,
  handleChooseDetail,
}: Props) => {
  const [bundle] = useBundleStore((state) => [state.currentBundle]);
  const [catDeal] = useCatDealStore((state) => [state.currentCatDeal]);
  const handleBack = () => {
    onClose?.();
  };
  const handleClick = () => {
    closeShopPanel?.();
  };

  const name = get(bundle, "name", "");
  let items = get(bundle, "items", []);

  const isBundle = useMemo(() => type === ShopType.Bundle, [type]);

  return (
    <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="text-xl">Congratulation!</div>
      {isBundle && (
        <div className="text-lg text-gray-30 mb-2">
          You purchased {name} successFully! You received:
        </div>
      )}
      {!isBundle && (
        <div className="text-lg text-gray-30 mb-2">
          You purchased a staff successfully!
        </div>
      )}
      <div className="flex gap-1 justify-center">
        {isBundle &&
          items.map(
            (
              item: { name: string; value: string; imageUrl: string },
              index: number
            ) => (
              <div
                key={index}
                className="w-[64px] h-[74px] bg-[#4E322F] p-1 rounded-lg"
              >
                <div className="bg-[#FFFEEC] flex items-center justify-center w-[56px] h-[48px] rounded-md">
                  <Image src={item.imageUrl} alt={""} width={28} height={28} />
                </div>
                <div className="text-center text-white">{item.value}</div>
              </div>
            )
          )}
        {!isBundle && (
          <div className="w-[140px] h-[182px] cursor-pointer">
            <CatCard cat={catDeal} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-6">
        {isBundle && (
          <div className="w-[164px] h-[39px]" onClick={handleClick}>
            <Button>Back home</Button>
          </div>
        )}
        {!isBundle && (
          <div className="w-[164px] h-[39px]">
            <Button onClick={handleChooseDetail}>View Detail</Button>
          </div>
        )}
        <div className="w-[164px] h-[39px]" onClick={handleBack}>
          <Button>Keep shopping</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
