import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { Restaurant } from "@/types/restaurant";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
  const name = get(restaurant, "name", "");
  const imageUrl = get(restaurant, "imageUrl", "");
  const totalSPB = get(restaurant, "totalSPB", "");
  const staffSlot = get(restaurant, "staffSlot", "");

  return (
    <div>
      <Image
        src={imageUrl}
        alt="res pic"
        width={288}
        height={144}
        className="aspect-[2/1] object-cover rounded"
      />
      <div className="flex justify-between items-start mt-2">
        <div>
          <div>{name}</div>
          <div className="flex gap-1 items-center">
            <div>
              <Image src="/images/coin.png" alt="coin" width={16} height={16} />
            </div>
            {totalSPB}/s
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div>
            <Image
              src="/images/cat-img.png"
              alt="coin"
              width={16}
              height={16}
            />
          </div>
          <div>{staffSlot}/6</div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
