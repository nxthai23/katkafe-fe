import React from "react";
import { InfoBox } from "./InfoBox";
import { MenuButton } from "./MenuButton";

type Props = {};

export const InGameUI = (props: Props) => {
    return (
        <div className="absolute game-ui top-0">
            <div className="absolute flex w-full justify-between px-2 py-4">
                <InfoBox title="Balance" content="120" />
                <InfoBox
                    title="Branch SPD"
                    content="604/s"
                    icon={{
                        url: "/icons/ic-farm.png",
                    }}
                />
                <InfoBox
                    title="Total SPD"
                    content="2004/s"
                    icon={{
                        url: "/icons/ic-farm.png",
                    }}
                />
            </div>

            <div className="absolute flex w-full justify-between bottom-4 px-8">
                <MenuButton title="Home" />
                <MenuButton
                    title="Staff"
                    icon={{
                        url: "/icons/ic-staff.png",
                    }}
                />
                <MenuButton
                    title="Manage"
                    icon={{
                        url: "/icons/ic-manage.png",
                    }}
                />
                <MenuButton
                    title="Shop"
                    icon={{
                        url: "/icons/ic-shop.png",
                    }}
                />
                <MenuButton
                    title="Boost"
                    icon={{
                        url: "/icons/ic-boost.png",
                    }}
                />
            </div>
        </div>
    );
};

