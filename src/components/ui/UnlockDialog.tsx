import React from "react";
import Button from "./Button";

type Props = {
  data: {
    title: string;
    description: string;
    catOwned: number;
    shopLevel: number;
    fee: number;
  };
  onClose?: () => void;
  closeShopPanel?: () => void;
};

const UnlockDialog: React.FC<Props> = ({ data, closeShopPanel }: Props) => {
  const handleClick = () => {
    closeShopPanel?.();
  };

  return (
    <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="p-4">
        <div className="text-xl">{data.title}</div>
        <div className="mx-auto font-light mb-4">{data.description}</div>
        <div className="flex gap-12">
          <div>
            <div>Cat Owned</div>
            <div className="flex gap-2 items-center text-[#F74751]">
              <div>
                <img src="./images/cat-img.png" alt="" width={24} height={24} />
              </div>
              {data.catOwned < 9 ? (
                <div className="flex items-center text-[#F74751]">
                  <span>{data.catOwned}</span>
                  <span>/9</span>
                </div>
              ) : (
                <div className="flex items-center text-black">
                  <span>{data.catOwned}</span>
                  <span>/9</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <div>Shop level</div>
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    src="./images/cat-img.png"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <span>{data.shopLevel}</span>
                  <span>/9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start mt-3">
          <div>Fee</div>
          <div className="flex gap-1">
            <img src="/images/coin.png" width={24} height={24} alt="" />
            <span>{data.fee}/150000</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t pt-2">
        <div className="w-[164px] h-[39px]" onClick={handleClick}>
          {data.catOwned < 9 ? (
            <Button disabled>Unlock</Button>
          ) : (
            <Button>Unlock</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnlockDialog;
