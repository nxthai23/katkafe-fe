import React from "react";
import Button from "./Button";

type Props = {};

const ConfirmDialog = () => {
    return (
        <div className="bg-[#fffeec] rounded-2xl w-full">
            <div>Congratulation</div>
            <div>You purchased Bundle is Name successfully! You received:</div>
            <div className="flex flex-wrap gap-2 justify-center">
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
