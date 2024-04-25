import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BronzeRank } from "@/types/bronzeRank";
import CardFriend from "./CardFriend";
import { UserType } from "@/types/user";
import CardUser from "./CardUser";

type Props = {
  bronzeRanks: BronzeRank[];
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
        width: "26px",
        height: "26px",
        "::before": "none",
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
      }}
      onClick={onClick}
    />
  );
};

const ImageSlider = ({ bronzeRanks }: Props) => {
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

  console.log("bronzeRanks", bronzeRanks);

  return (
    <Slider {...settings}>
      {bronzeRanks.map((bronzeRank) => (
        <div key={bronzeRank.id} className="mt-4">
          <div className="!flex justify-center mb-4">
            <div className="w-[164px] h-[164px] cursor-pointer">
              <Image
                src={bronzeRank.imageUrl}
                alt="bronze rank image"
                width={164}
                height={164}
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[244px]">
            <div className="flex flex-col gap-1">
              {[...Array(Number(bronzeRank.totalPeople))].map((_, index) =>
                bronzeRank.people[index] ? (
                  <CardFriend key={index} friend={bronzeRank.people[index]} />
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
