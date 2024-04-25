import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BronzeRank } from "@/types/bronzeRank";

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
                background: "url(images/nextArrow.png) no-repeat right",
                right: "10px",
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
                background: "url(images/prevArrow.png) no-repeat left",
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
            <NextArrow
                className={undefined}
                style={undefined}
                onClick={undefined}
            />
        ),
        prevArrow: (
            <PrevArrow
                className={undefined}
                style={undefined}
                onClick={undefined}
            />
        ),
    };

    return (
        <Slider {...settings}>
            {bronzeRanks.map((bronzeRank, index) => (
                <div
                    key={bronzeRank.id}
                    className="w-[164px] h-[164px] !flex justify-center cursor-pointer"
                >
                    <Image
                        src={bronzeRank.imageUrl}
                        alt="cat pic"
                        width={164}
                        height={164}
                    />
                </div>
            ))}
        </Slider>
    );
};

export default ImageSlider;
