import { useLayoutStore } from "@/stores/layoutStore";
import React from "react";

type Props = {};

function Boost({}: Props) {
  const [setShowBoostPanel] = useLayoutStore((state) => [
    state.setShowBoostPanel,
  ]);
  const handleClose = () => {
    setShowBoostPanel(false);
  };

  return (
    <div className="bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative flex items-center justify-center">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <img
              className="w-6 h-6"
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
            />
          </div>
          <div className="text-[30px] text-gray-40">Coming soon</div>
        </div>
      </div>
    </div>
  );
}

export default Boost;
