import React, { useEffect } from "react";
import Image from "next/image";
import { get } from "lodash";
import { useUserStore } from "@/stores/userStore";
import { useFetchUser } from "@/lib/hooks/useUser";

const CardFriend = () => {
  const user = useUserStore((state) => state.user);
  const { fetchUser } = useFetchUser();

  const imageUrl = get(user, "imageUrl", "");
  const name = get(user, "name", "");
  const rank = get(user, "rank", 0);
  const balance = get(user, "balance", 0);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-orange-10 border-[#e8ddbd] border rounded-lg w-full h-full p-2 flex gap-8 items-center justify-between">
      {user && (
        <>
          <div className="flex gap-4 items-center text-center">
            <div className="flex flex-col gap-0">
              <div>{rank}</div>
              <div className="uppercase">You</div>
            </div>
            <div className="rounded-full w-6 h-6">
              <Image src={imageUrl} alt="cat pic" width={24} height={24} />
            </div>
            <div>{name}</div>
          </div>
          <div className="flex items-center gap-1">
            <div>{balance}M</div>
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
