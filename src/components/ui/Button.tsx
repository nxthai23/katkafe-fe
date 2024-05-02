// Button.tsx
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: Function;
  disabled?: boolean;
};

const Button = ({ children, onClick, disabled = false }: Props) => {
  const handleOnClick = () => {
    onClick?.();
  };

  return (
    <button
      style={{
        boxShadow: "0px -4px 0px 0px #BC9D9B inset",
      }}
      className="border-[#5d5d5d] border w-full h-full rounded-2xl text-[#6f6f6f] flex items-center justify-center"
      onClick={handleOnClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
