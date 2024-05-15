import React, { useMemo } from "react";
import Image from "next/image";
import Button from "./Button";
import { DEFAULT_QUEST_ICON } from "@/constants/config";

type Props = {
  type: "achievement" | "task";
  content: string;
  img: {
    url?: string;
    width: number;
    height: number;
  };
  reward: {
    type: "cat" | "token";
    quantity: number | string;
  };
  button?: {
    text: string;
    onClick?: Function;
    disabled?: boolean;
  };
  progress?: {
    current: number | string;
    total: number | string;
  };
};

const CardTask = ({ type, content, img, reward, button, progress }: Props) => {
  const isAchievement = useMemo(() => type === "achievement", [type]);
  return (
    <div className="bg-orange-10 border-[#e8ddbd] border rounded-lg w-full h-full p-2">
      <div className="flex gap-8 items-start justify-between">
        <div className="flex flex-col">
          <div className="rounded-full w-6 h-6">
            <Image
              src={img.url || DEFAULT_QUEST_ICON}
              alt="quest-icon"
              width={img.width}
              height={img.height}
            />
          </div>
          <div>
            {content}
            {isAchievement && (
              <span>
                : {progress?.current || 0}/{progress?.total || 0}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div>{reward.quantity}</div>
          {reward.type === "token" && (
            <div className="w-[24px] h-[24px]">
              <img src="/images/coin.png" alt="" />
            </div>
          )}
        </div>
      </div>
      {isAchievement && (
        <Image
          src="/images/Progress-Bar.png"
          alt="progress"
          width={304}
          height={12}
          className="rounded-[100px]"
        />
      )}
      <div className="w-full flex justify-center mt-2">
        <div className="w-[76px] h-[28px] flex justify-center">
          <Button onClick={button?.onClick} disabled={button?.disabled}>
            {button?.text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardTask;
