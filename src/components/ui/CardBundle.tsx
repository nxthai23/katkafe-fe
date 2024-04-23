import React from "react";
import Image from "next/image";
import Button from "./Button";
import { get } from "lodash";

type BundleData = {
  name: string;
  imageUrl: string;
  price: number;
};

type Props = {
  bundle: BundleData;
  handleClick?: () => void;
};

const CardBundle = ({ bundle, handleClick }: Props) => {
  // const [bundle] = useBundleStore((state) => [state.currentBundle]);

  const imageUrl = get(bundle, "imageUrl", "");
  const name = get(bundle, "name", "");
  const price = get(bundle, "price", 0);

  return (
    <div
      className="bg-[#f4f2d6] rounded w-full h-full p-4 flex gap-8 items-center"
      onClick={handleClick}
    >
      <div className="">
        <Image src={imageUrl} alt="cat pic" width={150} height={97} />
      </div>
      <div className="flex flex-col gap-4 items-center text-center">
        <div>{name}</div>
        <div className="w-[88px] h-[30px] bg-[#fffde9] rounded-2xl">
          <Button>{price} $</Button>
        </div>
      </div>
    </div>
  );
};

export default CardBundle;
