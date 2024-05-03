import React from "react";
import Image from "next/image";
import { get } from "lodash";

type BaristaData = {
  id: string;
  name: string;
  imageUrl: string;
  totalBonus: number;
  totalFriend: number;
};

type Props = {
  barista: BaristaData;
};

const CardBarista = ({ barista }: Props) => {
  const id = get(barista, "id", "");
  const imageUrl = get(barista, "imageUrl", "");
  const name = get(barista, "name", "");
  const totalFriend = get(barista, "totalFriend", 0);
  const totalBonus = get(barista, "totalBonus", 0);

  return (
    <div className="bg-[#f4f2d6] border-[#e8ddbd] border rounded-lg w-full h-full p-2 flex gap-8 items-center justify-between">
      <div className="flex gap-2 items-center text-center">
        <div>{id}</div>
        <div className="rounded-full w-6 h-6">
          <Image src={imageUrl} alt="cat pic" width={24} height={24} />
        </div>
        <div>{name}</div>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4">
            <img src="/images/coin.png" alt="" />
          </div>
          <div>+{totalBonus}</div>
        </div>
        <div className="flex items-center gap-1">
          <div>
            <img src="/images/people.png" alt="" />
          </div>
          <div>{totalFriend}</div>
        </div>
      </div>
    </div>
  );
};

export default CardBarista;
