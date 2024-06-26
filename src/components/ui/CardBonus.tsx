import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { Rank } from "@/types/friend";

type Props = {
  rankConfig: Rank;
};

const CardBonus = ({ rankConfig }: Props) => {
  const imgUrl = get(rankConfig, "imgUrl", "");
  const name = get(rankConfig, "name", "");
  const numberReferral = get(rankConfig, "numberReferral", 0);
  const beanReward = get(rankConfig, "beanReward", "0");

  return (
    <div className="w-full h-full p-2 grid gap-8 items-center justify-between grid-cols-10">
      <div className="flex gap-2 items-center text-center col-span-4">
        <div className="rounded-full w-6 h-6">
          <Image src={imgUrl} alt="rank pic" width={24} height={24} />
        </div>
        <div>{name}</div>
      </div>
      <div className="flex items-center gap-1 col-span-3">
        <div className="flex items-center gap-x-1">
          <div>+{numberReferral}</div>
          <div className="w-4 h-4">
            <Image
              src="/icons/ic-user-ref.png"
              alt="icon user"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 col-span-3">
        <div>+{beanReward}</div>
      </div>
    </div>
  );
};

export default CardBonus;
