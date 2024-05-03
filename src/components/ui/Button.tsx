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
        boxShadow: "0px -4px 0px 0px #cccbbd inset",
      }}
      className="border-[#5e5745] border-2 w-full h-full rounded-lg text-[#5e5745] flex items-center justify-center"
      onClick={handleOnClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
