import React from "react";
import Button from "./Button";
import Image from "next/image";
import Star from "./Star";

type Props = {
  handleClaim: () => void;
  response: any;
};

const LoginAward = ({ handleClaim, response }: Props) => {
  return (
    <div className="relative z-50 top-1/2 -translate-y-1/2">
      <div className="w-full flex flex-col items-center mb-14">
        <div className="rounded-xl border-solid border-[#4e4837] border-[3px] h-[208px] w-[160px] mt-6">
          <div className="rounded-xl border-solid border-orange-20 border-[3px] h-full w-full">
            <div className="rounded-lg border-solid border-[#b2b19a] border h-full w-full flex flex-col justify-between relative">
              <div className="bg-[url('/images/bg-anim.png')] -z-10 bg-center bg-no-repeat bg-cover w-[344px] h-[345px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="bg-[url('/images/background-cat.png')] bg-center bg-no-repeat bg-cover h-full rounded-t">
                <div className="flex justify-center mt-20 relative">
                  <div className="absolute bg-[#898989] w-[30%] h-2 rounded-[100%] left-1/2 -translate-x-1/2 bottom-2 z-30"></div>
                  <Image
                    src={response?.imgUrl || ""}
                    alt="cat pic"
                    width={80}
                    height={80}
                    className="relative z-40"
                  />
                </div>
              </div>
              <div className="absolute top-3 w-full h-4">
                {response?.name && (
                  <div className="text-[14px] mx-1 pt-1 rounded-t text-center bg-[url('/images/bg-name.png')] bg-center bg-no-repeat bg-contain h-[38px] relative -my-1">
                    {response?.name}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center px-1 py-1 bg-orange-10 rounded-b-lg">
                {response?.level && (
                  <div className="text-sm">Lv.{response?.level}</div>
                )}
                <div className="flex items-center">
                  {[...Array(response?.numberStar)].map((_, index) => (
                    <Star
                      key={index}
                      numberStar={index + 1}
                      customClass="w-4 h-4"
                    ></Star>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center">
        <div className="flex gap-2 justify-center">
          <div
            className="w-[172px] h-[39px] bg-orange-10 rounded-xl"
            onClick={handleClaim}
          >
            <Button>Claim</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAward;
