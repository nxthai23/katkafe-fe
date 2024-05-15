/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import Star from "./Star";
import { get } from "lodash";

type CatData = {
  name: string;
  level: number;
  avatar: string;
  numberStar: number;
  backgroundUrl: string;
};

type Props = {
  cat: CatData;
  active?: boolean;
};

const StaffCard = ({ cat, active }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const handleCardClick = () => {
    if (isActive) {
      setIsActive(false);
    }
    setIsActive(!isActive);
  };
  const customClass = "w-4 h-4";

  const imageUrl = get(cat, "avatar", "");
  const name = get(cat, "name", "");
  const numberStar = get(cat, "numberStar", 0);
  const level = get(cat, "level", 0);

  return (
    <div
      className={`rounded-xl border-solid border-[#4e4837] border-[3px] h-full w-full cursor-pointer relative ${
        active ? "border-[#FC9B53]" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="rounded-xl border-solid border-orange-20 border-[3px] h-full w-full">
        <div className="rounded-lg border-solid border-[#b2b19a] border h-full w-full flex flex-col justify-between relative">
          <div className="bg-[url('/images/background-cat.png')] bg-center bg-no-repeat bg-contain h-full">
            <div className="flex justify-center mt-3">
              <Image src={imageUrl} alt="cat pic" width={92.5} height={106} />
            </div>
          </div>
          <div className="absolute top-0 w-full h-4">
            {name && (
              <div className="text-[8px] mx-1 pt-[7px] text-center bg-[url('/images/bg-name.png')] bg-center bg-no-repeat bg-contain h-[30px] relative -my-1">
                {name}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center px-1">
            {level && <div className="text-xs">Lv.{level}</div>}
            <div className="flex items-center">
              {[...Array(numberStar)].map((_, index) => (
                <Star
                  key={index}
                  numberStar={index + 1}
                  customClass={customClass}
                ></Star>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
