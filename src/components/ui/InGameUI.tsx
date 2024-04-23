import React, { useState } from "react";
import { InfoBox } from "./InfoBox";
import { MenuButton } from "./MenuButton";
import { useLayoutStore } from "@/stores/layoutStore";

export const InGameUI = () => {
  const [
    setShowFriendPanel,
    setShowManagePanel,
    setShowStaffPanel,
    setShowShopPanel,
  ] = useLayoutStore((state) => [
    state.setShowFriendPanel,
    state.setShowManagePanel,
    state.setShowStaffPanel,
    state.setShowShopPanel,
  ]);

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
          onClick={() => setShowStaffPanel(true)}
        />
        <MenuButton
          key="manage"
          title="Manage"
          icon={{
            url: "/icons/ic-manage.png",
          }}
          onClick={() => setShowManagePanel(true)}
        />
        <MenuButton
          key="shop"
          title="Shop"
          icon={{
            url: "/icons/ic-shop.png",
          }}
          onClick={() => setShowShopPanel(true)}
        />
        <MenuButton
          key="friend"
          title="Friend"
          icon={{
            url: "/icons/ic-boost.png",
          }}
          onClick={() => setShowFriendPanel(true)}
        />
      </div>
    </div>
  );
};
