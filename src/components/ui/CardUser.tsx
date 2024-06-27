import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { LeaderBoard } from "@/types/leaderBoard";
import { ordinalSuffix } from "@/utils/helpers";
import FormatText from "./FormatText";

type Props = {
  user: LeaderBoard | null;
};

const CardFriend = ({ user }: Props) => {
  const imageUrl = get(user, "avatarUrl", "");
  const name = get(user, "username", "");
  const rank = get(user, "rank", 0);
  const balance = get(user, "bean", 0);

  return (
    <div className="bg-orange-10 border-[#e8ddbd] border rounded-lg w-full h-full p-2 flex gap-8 items-center justify-between">
      {user && (
        <>
          <div className="flex gap-4 items-center text-center ">
            <div className="flex flex-col gap-0">
              <div className="text-bodySm text-gray-60">
                {ordinalSuffix(rank)}
              </div>
              <div className="uppercase text-gray-90 text-bodySm">You</div>
            </div>
            <div className="rounded-full w-6 h-6">
              <Image
                className="rounded-[100px]"
                src={imageUrl}
                alt="cat pic"
                width={24}
                height={24}
              />
            </div>
            <div className="text-bodyMd text-gray-60">
              <FormatText text={name} />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-bodyMd text-gray-60">{balance}</div>
            <div>
              <Image
                src="/images/coin.png"
                alt="cat pic"
                width={16}
                height={16}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardFriend;
