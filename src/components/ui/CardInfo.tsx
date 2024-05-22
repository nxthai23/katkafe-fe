import React, { useState } from "react";
import Image from "next/image";
import Star from "./Star";
import Button from "./Button";
import StaffUpgrade from "../panels/staff/UserStaffUpgrade";
import { useStaffStore } from "@/stores/staffStore";

type Props = {
  onClose?: () => void;
};

const CardInfo: React.FC<Props> = ({ onClose }: Props) => {
  const [showStaffUpgradePanel, setShowStaffUpgradePanel] = useState(false);
  const [staff] = useStaffStore((state) => [state.currentStaff]);

  const customClass = "w-4 h-4";

  const handleBack = () => {
    onClose?.();
  };

  const handleShowStaffUpgrade = () => {
    setShowStaffUpgradePanel(true);
  };

  return (
    <div className="info-panel bg-[#2e2e2e] w-full h-full absolute z-40 p-4 top-0 left-0">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-[calc(100%-16px)] mt-4">
        <div className="rounded-[21px] border-solid border-orange-30 border-4 bg-orange-30 h-full relative">
          <div className="absolute -top-4 -left-3 cursor-pointer">
            <img
              className="w-8 h-8"
              src="/images/back.png"
              alt=""
              onClick={handleBack}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[28px] border-2 px-6 py-2 border-orange-90 bg-orange-10 rounded-t-xl text-orange-90">
            Staff Info
          </div>
          <span className="flex justify-between gap-2 absolute top-[14px] w-[90%] left-1/2 -translate-x-1/2">
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
            <p className="bg-red-10 h-[2px] w-[70%]"></p>
            <p className="bg-red-10 h-[2px] w-[13%]"></p>
          </span>
          <div className="bg-orange-10 h-[calc(100%-32px)] mt-8 relative flex flex-col justify-between items-center p-2 rounded-b-[20px] rounded-t border border-gray-20">
            <div className="w-full flex flex-col items-center">
              <div className="rounded-xl border-solid border-[#4e4837] border-[3px] h-[208px] w-[160px] mt-6">
                <div className="rounded-xl border-solid border-orange-20 border-[3px] h-full w-full">
                  <div className="rounded-lg border-solid border-[#b2b19a] border h-full w-full flex flex-col justify-between relative">
                    <div className="bg-[url('/images/background-cat.png')] bg-center bg-no-repeat bg-cover h-full">
                      <div className="flex justify-center mt-20">
                        <Image
                          src={staff?.imgUrl || ""}
                          alt="cat pic"
                          width={80}
                          height={80}
                        />
                      </div>
                    </div>
                    <div className="absolute top-3 w-full h-4">
                      {staff?.name && (
                        <div className="text-[14px] mx-1 pt-1 rounded-t text-center bg-[url('/images/bg-name.png')] bg-center bg-no-repeat bg-contain h-[38px] relative -my-1">
                          {staff?.name}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center px-1 py-1">
                      {staff?.level && (
                        <div className="text-sm">Lv.{staff?.level}</div>
                      )}
                      <div className="flex items-center">
                        {[...Array(staff?.numberStar)].map((_, index) => (
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
              <div className="w-full font-normal mt-4">
                <div className="text-bodyMd text-[#6F6F6F]">Earning Speed</div>
                <div className="flex gap-1 items-center">
                  <span>
                    <img className="w-4 h-4" src="/images/speed.png" alt="" />
                  </span>
                  <span>{staff?.speed} / s</span>
                </div>
                <hr className="border-[#B5B5B5] mt-3 mb-2" />
                <div className="text-bodyMd text-[#6F6F6F]">Upgrade Fee</div>
                {/* TODO: chưa có API */}
                <div className="flex items-center gap-1">
                  <span>
                    <img className="h-4 w-4" src="/images/coin.png" alt="" />
                  </span>
                  <div>12 M / </div>
                  <span>
                    <img className="h-4 w-4" src="/images/coin.png" alt="" />
                  </span>
                  <div> 124.987 M</div>
                </div>

                <div className="items-center">
                  <span className="text-bodyMd text-[#6F6F6F]">
                    Cat require
                  </span>
                  <span className="flex items-center gap-1">0 / 3</span>
                </div>
              </div>
            </div>
            <div className="w-full text-center">
              <hr className="mt-4 my-2 border-[#e8ddbd]" />
              <div className="flex gap-2 justify-center">
                <div
                  className="w-[172px] h-[39px]"
                  onClick={handleShowStaffUpgrade}
                >
                  <Button>Pick Cat</Button>
                </div>
                <div className="w-[172px] h-[39px]">
                  <Button disabled>Upgrade</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showStaffUpgradePanel && (
        <div className="absolute z-50 w-full h-full top-0 left-0">
          <StaffUpgrade showStaffUpgradePanel={setShowStaffUpgradePanel} />
        </div>
      )}
    </div>
  );
};

export default CardInfo;
