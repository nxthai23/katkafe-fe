import { DEFAULT_INFO_ICON } from "@/constants/icon";
import Image from "next/image";
import React from "react";

type Props = {
    title: string;
    icon?: {
        url: string;
        size?: number;
    };
    content: string;
};

export const InfoBox = ({ title, icon, content }: Props) => {
    return (
        <div className="flex flex-col info-box bg-info-box bg-no-repeat bg-contain text-center uppercase p-1">
            <div className="text-xs text-accent">{title}</div>
            <div className="flex w-full items-center justify-center px-1">
                <div>
                    <Image
                        src={icon?.url || DEFAULT_INFO_ICON}
                        width={icon?.size || 16}
                        height={icon?.size || 16}
                        alt="icon"
                    />
                </div>
                <div className="grow text-base leading-tight">{content}</div>
            </div>
        </div>
    );
};

