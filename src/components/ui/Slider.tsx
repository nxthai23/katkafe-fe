import React, { useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rank } from "@/types/rank";
import CardFriend from "./CardFriend";
import CardUser from "./CardUser";
import { useUserStore } from "@/stores/userStore";
import { get } from "lodash";
import { Progress } from "@radix-ui/react-progress";

type Props = {
  ranks: Rank[];
};

const NextArrow = (props: { className: any; style: any; onClick: any }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "url(/images/nextArrow.png) no-repeat right",
        right: "10px",
        top: "90px",
        width: "28px",
        height: "26px",
        zIndex: "99",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: { className: any; style: any; onClick: any }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "url(/images/prevArrow.png) no-repeat left",
        left: "10px",
        top: "90px",
        width: "28px",
        height: "26px",
        zIndex: "99",
      }}
      onClick={onClick}
    />
  );
};

const ImageSlider = ({ ranks }: Props) => {
  const user = useUserStore((state) => state.user);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <NextArrow className="slick-next" style={{}} onClick={undefined} />
    ),
    prevArrow: (
      <PrevArrow className="slick-prev" style={{}} onClick={undefined} />
    ),
  };

  return (
    <Slider {...settings}>
      {ranks.map((rank) => (
        <div key={rank.id} className="mt-4">
          <div className="!flex justify-center mb-14">
            <div className="w-[164px] h-[164px] cursor-pointer">
              <Image src={rank.imageUrl} alt="rank" width={164} height={164} />
              <div className="uppercase text-center">{rank.title}</div>
              <div className="text-center text-sm">
                {user.balance}M/{rank.balance}M
              </div>
              <Progress value={33} />
            </div>
          </div>
          <div className="overflow-y-auto h-[204px]">
            <div className="flex flex-col gap-1">
              {[...Array(Number(rank.totalPeople))].map((_, index) =>
                rank.people[index] ? (
                  <CardFriend key={index} friend={rank.people[index]} />
                ) : null
              )}
            </div>
          </div>
          <CardUser />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
