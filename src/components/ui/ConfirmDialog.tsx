import React from "react";
import Button from "./Button";

type Props = {
  onCancel?: () => void;
  onAgree?: () => void;
};

function ConfirmDialog({ onCancel, onAgree }: Props) {
  return (
    <div className="bg-orange-10 absolute rounded-2xl w-[95%] text-center pt-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
      <div className="text-xl">Are you sure buy items this?</div>
      <div className="flex flex-wrap gap-2 justify-center border-[#E8DDBD] border-t py-3 mt-6">
        <div className="w-[164px] h-[39px]" onClick={onCancel}>
          <Button>Cancel</Button>
        </div>

        <div className="w-[164px] h-[39px]" onClick={onAgree}>
          <Button>OK</Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
