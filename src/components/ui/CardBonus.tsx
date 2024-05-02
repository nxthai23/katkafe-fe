import React from "react";
import Image from "next/image";
import { get } from "lodash";

type BonusData = {
  id: string;
  title: string;
  imageUrl: string;
  regular: number;
  premium: number;
};

type Props = {
  bonus: BonusData;
};

const CardBonus = ({ bonus }: Props) => {
  const id = get(bonus, "id", "");
  const imageUrl = get(bonus, "imageUrl", "");
  const title = get(bonus, "title", "");
  const premium = get(bonus, "premium", 0);
  const regular = get(bonus, "regular", 0);

  return (
    <div className="w-full h-full p-2 grid gap-8 items-center justify-between grid-cols-10">
      <div className="flex gap-2 items-center text-center col-span-4">
        <div className="rounded-full w-6 h-6">
          <Image src={imageUrl} alt="cat pic" width={24} height={24} />
        </div>
        <div>{title}</div>
      </div>
      <div className="flex items-center gap-1 col-span-3">
        <div>+{regular}</div>
      </div>
      <div className="flex items-center gap-1 col-span-3">
        <div>{premium}</div>
      </div>
    </div>
  );
};

export default CardBonus;
