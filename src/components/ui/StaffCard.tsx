/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import Star from "./Star";
import { get } from "lodash";
import { useOneStaff } from "@/lib/hooks/cat/useOneStaff";

type Props = {
  catId: string;
  active?: boolean;
  onViewClick: (id: number) => void;
  onRemoveClick: (id: number) => void;
};

const StaffCard = ({ catId, active, onViewClick, onRemoveClick }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const cat = useOneStaff(catId);
  const handleCardClick = () => {
    if (isActive) {
      setIsActive(false);
    }
    setIsActive(!isActive);
  };
  const handleViewClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onViewClick(Number(catId));
  };
  const handleRemoveClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onRemoveClick(Number(cat?._id));
  };
  const customClass = "w-4 h-4";

  const imageUrl = get(cat, "imgUrl", "");
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
      <div
        className={`absolute gap-2 flex z-30 -bottom-3 left-1/2 -translate-x-1/2 ${
          !active ? "hidden" : ""
        }`}
      >
        <div onClick={handleRemoveClick} className="w-6 h-6">
          <img src="/images/btn-close.png" alt="" />
        </div>
        <div onClick={handleViewClick} className="w-6 h-6">
          <img src="/images/view.png" alt="" />
        </div>
      </div>
      <div className="rounded-xl border-solid border-orange-20 border-[3px] h-full w-full">
        <div className="rounded-lg border-solid border-[#b2b19a] border h-full w-full flex flex-col justify-between relative">
          <div className="bg-[url('/images/background-cat.png')] bg-center bg-no-repeat bg-contain h-full flex items-end justify-center">
            <div className="flex justify-center relative">
              <div className="absolute bg-[#898989] w-[50%] h-2 rounded-[100%] left-1/2 -translate-x-1/2 bottom-2 z-30"></div>
              <img
                src={imageUrl}
                alt=""
                className="w-[86px] h-[86px] flex items-center relative z-40"
              />
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
