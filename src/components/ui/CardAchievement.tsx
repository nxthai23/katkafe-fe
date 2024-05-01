import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { Achievement } from "@/types/quest";
import Button from "./Button";

type Props = {
  achievement: Achievement;
};

const CardAchievement = ({ achievement }: Props) => {
  const id = get(achievement, "id", "");
  const imageUrl = get(achievement, "imageUrl", "");
  const title = get(achievement, "title", "");
  const totalAchievement = get(achievement, "totalAchievement", 0);
  const claim = get(achievement, "claim", 0);

  return (
    <div className="bg-[#fffeec] border-[#e8ddbd] border rounded-lg w-full h-full p-2">
      <div className="flex gap-8 items-start justify-between mb-1">
        <div className="flex flex-col">
          <div className="rounded-full w-6 h-6">
            <Image src={imageUrl} alt="cat pic" width={24} height={24} />
          </div>
          <div>
            {title}: 33/{totalAchievement}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div>{claim}</div>
          <div>
            <img src="/images/coin.png" alt="" />
          </div>
        </div>
      </div>
      <Image
        src="/images/Progress-Bar.png"
        alt="cat pic"
        width={304}
        height={12}
        className="rounded-[100px]"
      />
      <div className="w-full flex justify-center mt-2">
        <div className="w-[76px] h-[28px] flex justify-center opacity-50">
          <Button>Claim</Button>
        </div>
      </div>
    </div>
  );
};

export default CardAchievement;
