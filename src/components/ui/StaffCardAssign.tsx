/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import Star from "./Star";
import { get } from "lodash";
import { RARITY, Staff } from "@/types/common-types";
import classNames from "classnames";

type Props = {
  cat: Staff;
  active?: boolean;
  handleClick?: (staffId: string) => void;
};

const StaffCard = ({ cat, active, handleClick }: Props) => {
  const customClass = "w-4 h-4";

  const imageUrl = get(cat, "imgUrl", "");
  const name = get(cat, "name", "");
  const numberStar = get(cat, "numberStar", 0);
  const level = get(cat, "level", 0);
  const rarity = get(cat, "rarity", RARITY.COMMON);
  const backgroundCard = get(rarity, "backgroundCard", "");
  const textColorClasses = get(rarity, "textColorClasses", "");

  return (
    <div
      className="h-full w-full cursor-pointer bg-center bg-no-repeat bg-contain relative"
      onClick={() => {
        handleClick?.(cat._id);
      }}
      style={{ backgroundImage: backgroundCard }}
    >
      <div className="h-full w-full">
        {active && (
          <div className="active-overlay relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src="/images/active.png" alt="" className="w-4 h-4" />
            </div>
          </div>
        )}
        <div className="h-full w-full flex flex-col justify-between relative">
          <div className="bg-[url('/images/background-cat.png')] bg-center bg-no-repeat bg-contain h-full flex items-end justify-center mt-[18px]">
            <div className="flex justify-center relative">
              <div className="absolute bg-[#898989] w-[50%] h-2 rounded-[100%] left-1/2 -translate-x-1/2 bottom-2 z-30"></div>

              <Image
                src={imageUrl}
                alt="cat pic"
                width={92.5}
                height={106}
                className="relative z-40"
              />
            </div>
          </div>
          <div className="absolute w-full h-4">
            {name && (
              <div
                className={classNames(
                  "text-[8px] mx-1 pt-[8px] text-center h-[30px] relative -my-1",
                  textColorClasses
                )}
              >
                {name}
              </div>
            )}
          </div>
          <div
            className={classNames(
              "flex justify-between items-center px-2 mb-1",
              textColorClasses
            )}
          >
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
