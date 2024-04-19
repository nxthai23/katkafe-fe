// Button.tsx
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Button = ({ children }: Props) => {
    return (
        <button
            style={{
                boxShadow: "0px -4px 0px 0px #BC9D9B inset",
            }}
            className="border-[#5d5d5d] border w-full h-full rounded-2xl text-[#6f6f6f] py-2 px-4"
        >
            {children}
        </button>
    );
};
export default Button;
