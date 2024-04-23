import React from "react";
import Button from "./Button";

const ConfirmDialog = () => {
    return (
        <div className="bg-[#fffeec] absolute rounded-2xl w-[95%] text-center pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="text-xl">Congratulation</div>
            <div className="max-w-[230px] mx-auto font-light mb-4">
                You purchased Bundle is Name successfully! You received:
            </div>
            <div className="flex justify-center gap-12">
                <div className="flex gap-2 items-center">
                    <div>
                        <img
                            src="/images/coin.png"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </div>
                    <span> x 300</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div>
                        <img
                            src="/images/coin.png"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </div>
                    <span> x 100</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-8">
                <div className="w-[164px] h-[39px]">
                    <Button>Back to home</Button>
                </div>
                <div className="w-[164px] h-[39px]">
                    <Button>Keep shopping</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
