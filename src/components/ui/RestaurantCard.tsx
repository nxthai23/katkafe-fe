import React from "react";
import Image from "next/image";

type Props = {
    name: string;
    imageUrl: string;
};

const RestaurantCard = ({ imageUrl, name }: Props) => {
    return (
        <div className="-mb-4 flex justify-center">
            <Image
                src={imageUrl}
                alt="res pic"
                width={352}
                height={140}
                className=""
            />
        </div>
    );
};

export default RestaurantCard;
