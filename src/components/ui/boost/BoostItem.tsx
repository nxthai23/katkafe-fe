import React from "react";
import Image from "next/image";
import Button from "../Button";
import { BoostConfig, BoostType } from "@/types/boost";
import {
  formatStringNumber,
  isoStringToDateTimeString,
  secondsToHours,
  secondsToMinutes,
} from "@/utils/helpers";
import { useUserStore } from "@/stores/userStore";
import { get } from "lodash";
import moment from "moment";

type Props = {
  boostConfig: BoostConfig;
  isOtherBoostActive?: boolean;
  onClick?: (boostConfigId: string) => void;
};

export const BoostItem = ({
  boostConfig,
  isOtherBoostActive,
  onClick,
}: Props) => {
  const [user] = useUserStore((state) => [state.user]);
  const isCooldown =
    boostConfig.type === BoostType.IDLE
      ? moment()
          .utc()
          .startOf("seconds")
          .isBefore(moment(get(user, "nextIdleBoostAt", "")).utc())
      : moment()
          .utc()
          .startOf("seconds")
          .isBefore(moment(get(user, "nextTapBoostAt", "")).utc());

  const handleOnClick = () => {
    onClick && onClick(boostConfig._id);
  };

  return (
    <div className="w-full flex justify-between items-center border border-orange-20 rounded-xl px-2 py-3 shadow-bottom-xl-orange-20 relative">
      <div className="flex items-center gap-x-2">
        {/* booster image */}
        <div className="flex justify-center items-center w-[64px] h-[72px] bg-orange-20 rounded-xl">
          <Image
            src={boostConfig.imgUrl}
            alt="Boost card"
            width={48}
            height={48}
            className="rounded-xl bg-orange-20"
          />
        </div>

        {/* booster info */}
        <div className="flex flex-col">
          <div>{boostConfig.name}</div>
          <div className="grid grid-cols-2 gap-x-2">
            <span className="text-sm text-orange-90">Speed:</span>
            <span className="text-sm text-orange-90">
              x{boostConfig.boostMultiply}
            </span>
            {!!boostConfig.cooldown && (
              <span className="text-sm text-orange-90">Cooldown:</span>
            )}
            {!!boostConfig.cooldown && (
              <span className="text-sm text-orange-90">
                {secondsToHours(boostConfig.cooldown)}h
              </span>
            )}
            <span className="text-sm text-orange-90">Duration:</span>
            <span className="text-sm text-orange-90">
              {secondsToMinutes(boostConfig.duration)}m
            </span>
          </div>
        </div>
      </div>

      <div>
        {boostConfig.fee === "0" ? (
          <Button customClassNames="px-4 pb-1" onClick={handleOnClick}>
            Free
          </Button>
        ) : (
          <Button customClassNames="px-4 pb-1" onClick={handleOnClick}>
            {formatStringNumber(boostConfig.fee)}
            <Image
              className="ml-1"
              src="/images/coin.png"
              alt="coin"
              width={16}
              height={16}
            />
          </Button>
        )}
      </div>
      {isCooldown && boostConfig.fee === "0" && !isOtherBoostActive && (
        <div className="flex flex-col justify-center items-center inset-x-0 absolute w-full h-full z-10 rounded-xl bg-black opacity-70">
          <div className="text-white z-9">Cooldown</div>
          <div className="text-white z-9">
            Available:{" "}
            {isoStringToDateTimeString(get(user, "nextIdleBoostAt", ""))}
          </div>
        </div>
      )}
      {isOtherBoostActive && (
        <div className="flex flex-col justify-center items-center inset-x-0 absolute w-full h-full z-10 rounded-xl bg-black opacity-70">
          <div className="text-white z-9">Another booster is activating</div>
        </div>
      )}
    </div>
  );
};