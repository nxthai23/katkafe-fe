import Slider from "@/components/ui/Slider";
import { useLayoutStore } from "@/stores/layoutStore";
import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { useFetchRanks } from "@/lib/hooks/rank/useRank";
import { useRankStore } from "@/stores/rank/rankStore";

type Props = {};

function Rank({}: Props) {
  const [setShowRankPanel] = useLayoutStore((state) => [
    state.setShowRankPanel,
  ]);
  const [ranks] = useRankStore((state) => [state.ranks]);
  const { fetchRanks } = useFetchRanks();

  const handleClose = () => {
    setShowRankPanel(false);
  };

  useEffect(() => {
    fetchRanks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-panel bg-[#2e2e2e] w-full h-full absolute z-10 p-4 top-0">
      <div className="rounded-3xl border-solid border-[#5e5745] border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-[#ffedbb] border-4 bg-[#ffedbb] h-full relative">
          <div className="absolute -right-[15px] -top-[13px] bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
            <Image
              src="/images/btn-close.png"
              alt=""
              onClick={handleClose}
              width={24}
              height={24}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-[#5e5745] bg-[#fffeec] rounded-t-xl text-[#5e5745]">
            Ranking
          </div>

          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[70%]"></p>
            <p className="bg-[#e3b695] h-[2px] w-[13%]"></p>
          </span>
          <div className="w-full bg-[#fff8de] rounded-b-[20px] rounded-t border border-[#b5b5b5] absolute z-10 h-[calc(100%-32px)] p-1 overflow-hidden mt-8">
            <Slider ranks={ranks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rank;
