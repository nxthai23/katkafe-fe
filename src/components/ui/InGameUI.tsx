import React, { useState } from "react";
import { InfoBox } from "./InfoBox";
import { MenuButton } from "./MenuButton";
import Game from "../panels/game/Game";
import Staff from "../panels/staff/UserStaffList";
import Manage from "../panels/manage/Manage";

export const InGameUI = () => {
    const [showGamePanel, setShowGamePanel] = useState(false);
    const [showStaffPanel, setShowStaffPanel] = useState(false);
    const [showManagePanel, setShowManagePanel] = useState(false);

    const toggleGamePanel = () => {
        setShowGamePanel(!showGamePanel);
    };
    const toggleStaffPanel = () => {
        setShowStaffPanel(!showStaffPanel);
    };
    const toggleManagePanel = () => {
        setShowManagePanel(!showManagePanel);
    };

    return (
        <div className="absolute game-ui top-0">
            <div className="absolute flex w-full justify-between px-2 py-4">
                <InfoBox key="branch" title="Balance" content="120" />
                <InfoBox
                    key="branchSPD"
                    title="Branch SPD"
                    content="604/s"
                    icon={{
                        url: "/icons/ic-farm.png",
                    }}
                />
                <InfoBox
                    key="totalSPD"
                    title="Total SPD"
                    content="2004/s"
                    icon={{
                        url: "/icons/ic-farm.png",
                    }}
                />
            </div>

            <div className="absolute flex w-full justify-between bottom-4 px-8">
                <MenuButton key="home" title="Home" />
                <MenuButton
                    key="list"
                    title="List"
                    icon={{
                        url: "/icons/ic-staff.png",
                    }}
                    onClick={toggleStaffPanel}
                />
                <MenuButton
                    key="manage"
                    title="Manage"
                    icon={{
                        url: "/icons/ic-manage.png",
                    }}
                    onClick={toggleManagePanel}
                />
                <MenuButton
                    key="shop"
                    title="Shop"
                    icon={{
                        url: "/icons/ic-shop.png",
                    }}
                />
                <MenuButton
                    key="friend"
                    title="Friend"
                    icon={{
                        url: "/icons/ic-boost.png",
                    }}
                    onClick={toggleGamePanel}
                />
            </div>
            {showGamePanel && <Game showGamePanel={setShowGamePanel} />}
            {showStaffPanel && <Staff showStaffPanel={setShowStaffPanel} />}
            {showManagePanel && <Manage showManagePanel={setShowManagePanel} />}
        </div>
    );
};
