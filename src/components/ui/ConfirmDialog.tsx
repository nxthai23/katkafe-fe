import React from "react";
import Button from "./Button";
import { useBundleStore } from "@/stores/shop/bundleStore";
import { get } from "lodash";
import Image from "next/image";

type Props = {
  data: {
    title: string;
    description: string;
    imageUrl: string;
  };
  onClose?: () => void;
  closeShopPanel?: () => void;
};

const ConfirmDialog: React.FC<Props> = ({
  data,
  onClose,
  closeShopPanel,
}: Props) => {
  const [bundle] = useBundleStore((state) => [state.currentBundle]);
  const handleBack = () => {
    onClose?.();
  };
  const handleClick = () => {
    closeShopPanel?.();
  };

  const items = get(bundle, "items", []);

  return (
    <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="text-xl">{data.title}</div>
      <div className="max-w-[230px] mx-auto font-light mb-4">
        {data.description}
      </div>
      <div className="flex gap-1 justify-center">
        {items.map(
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
      </div>

      <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-6">
        <div className="w-[164px] h-[39px]" onClick={handleClick}>
          <Button>Back to home</Button>
        </div>
        <div className="w-[164px] h-[39px]" onClick={handleBack}>
          <Button>Keep shopping</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
