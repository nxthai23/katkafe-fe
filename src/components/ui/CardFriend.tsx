import React from "react";
import Image from "next/image";
import { get } from "lodash";

type FriendData = {
  name: string;
  imageUrl: string;
  balance: number;
  totalFriend: number;
};

type Props = {
  friend: FriendData;
};

const CardFriend = ({ friend }: Props) => {
  const imageUrl = get(friend, "imageUrl", "");
  const name = get(friend, "name", "");
  const totalFriend = get(friend, "totalFriend", 0);
  const balance = get(friend, "balance", 0);

  return (
    <div className="bg-[#f4f2d6] border-[#e8ddbd] border rounded-lg w-full h-full p-4 flex gap-8 items-center justify-between">
      <div className="flex gap-2 items-center text-center">
        <div className="rounded-full w-6 h-6">
          <Image src={imageUrl} alt="cat pic" width={24} height={24} />
        </div>
        <div>{name}</div>
      </div>
      <div className="flex items-center gap-1">
        <div>
          <img src="/images/coin.png" alt="" />
        </div>
        <div>{balance}</div>
      </div>
    </div>
  );
};

export default CardFriend;
