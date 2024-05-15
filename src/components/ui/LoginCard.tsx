import React from "react";
import Button from "./Button";
import Image from "next/image";

// @TODO: check login first time login or not
const ConfirmDialog = () => {
  return (
    <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="p-3">
        <div className="text-xl mb-1">Congratulation!</div>
        <div className="text-bodyLg text-gray-30 mb-4 max-w-[250px] mx-auto">
          You received a new comer gift. Open it to get your first staff.
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/login.png"
            alt="cat pic"
            width={120}
            height={120}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-6">
        <div className="w-[164px] h-[39px]">
          <Button>Open</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
