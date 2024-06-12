import React from "react";
import Image from "next/image";
import { get } from "lodash";
import { Restaurant } from "@/types/restaurant";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
  const [power] = useRestaurantStore((state) => [state.power]);
  const name = get(restaurant, "name", "");
  const imageUrl = get(restaurant, "imgUrl", "");
  const staffSlot = get(restaurant, "slot", "");
  const cats = get(restaurant, "cats", []);

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
              <Image
                src="/images/speed.png"
                alt="coin"
                width={16}
                height={16}
              />
            </div>
            {power}/s
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div>
            <Image
              src="/images/slot_cat.png"
              alt="coin"
              width={16}
              height={16}
            />
          </div>
          <div>
            {cats.length}/{staffSlot}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
