import React, { useMemo } from "react";
import Image from "next/image";
import { DEFAULT_QUEST_ICON } from "@/constants/config";

type Props = {
  type: "friendzone" | "barista";
  id: string;
  img: {
    url?: string;
    width: number;
    height: number;
  };
  balance: number;
  name: string;
  totalBonus: number;
  totalFriend: number;
};

const CardBarista = ({
  id,
  type,
  name,
  img,
  balance,
  totalBonus,
  totalFriend,
}: Props) => {
  const isBarista = useMemo(() => type === "barista", [type]);

  return (
    <div className="w-full h-full p-2 pl-4 flex gap-8 items-center justify-between">
      <div className="flex gap-2 items-center text-center">
        <div>{id}</div>
        <div className="rounded-full w-6 h-6">
          <Image
            src={img.url || DEFAULT_QUEST_ICON}
            alt="cat pic"
            width={24}
            height={24}
          />
        </div>
        <div>{name}</div>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <div>
            {isBarista && <span>+</span>}
            {totalBonus}
          </div>
          <div className="w-4 h-4">
            <img src="/images/kbuck.png" alt="" />
          </div>
        </div>
        {isBarista && (
          <div className="flex items-center justify-end gap-1">
            <div>{totalFriend}</div>
            <div className="w-4 h-4">
              <img src="/images/people.png" alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBarista;
