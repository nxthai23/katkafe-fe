import React, { useEffect, useState } from "react";
import { InfoBox } from "./InfoBox";
import { MenuButton } from "./MenuButton";
import { useLayoutStore } from "@/stores/layoutStore";
import { useUserStore } from "@/stores/userStore";
import LoginDialog from "./LoginDialog";
import { createCat, updateLoginStatus } from "@/requests/login";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import LoginAward from "./LoginAward";
import { UserType } from "@/types/user";

export const InGameUI = () => {
  const [
    setShowFriendPanel,
    setShowManagePanel,
    setShowStaffPanel,
    setShowShopPanel,
    setShowRestaurantPanel,
  ] = useLayoutStore((state) => [
    state.setShowFriendPanel,
    state.setShowManagePanel,
    state.setShowStaffPanel,
    state.setShowShopPanel,
    state.setShowRestaurantPanel,
  ]);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showLoginAward, setShowLoginAward] = useState(false);
  const [response, setResponse] = useState<UserType | null>(null);
  const [user, login, setUser] = useUserStore((state) => [
    state.user,
    state.login,
    state.setUser,
  ]);
  const power = useRestaurantStore((state) => state.power);

  const numberCats = 4;

  const handleClick = async () => {
    setShowLoginDialog(false);
    try {
      const response = await updateLoginStatus();
      if (response) {
        setUser(response);
        setResponse(response);
      }
    } catch (error) {
      console.log("Error updating login status", error);
    }
    setShowLoginAward(true);
  };
  const handleClaim = async () => {
    try {
      for (let i = 0; i < numberCats; i++) {
        await createCat();
      }
    } catch (error) {
      console.log("Create error", error);
    }
    setShowLoginAward(false);
  };

  useEffect(() => {
    const Login = async () => {
      try {
        const loginBody = {
          type: "local",
          telegramId: "telegramId123",
        };
        await login(loginBody);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    Login();
    setShowLoginDialog(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  return (
    <div className="absolute game-ui top-0">
      <div className="absolute flex w-full justify-between px-2 py-4">
        <InfoBox key="branch" title="Balance" content="120" />
        <InfoBox
          key="branchSPD"
          title="Branch SPD"
          content={power ? power + "/s" : "0/s"}
          icon={{
            url: "/icons/ic-farm.png",
          }}
        />
        <InfoBox
          key="totalSPD"
          title="Total SPD"
          content={power ? power + "/s" : "0/s"}
          icon={{
            url: "/icons/ic-farm.png",
          }}
        />
      </div>

      <div className="absolute flex w-full justify-between bottom-4 px-8">
        <MenuButton
          key="home"
          title="Home"
          onClick={() => setShowRestaurantPanel(true)}
        />
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
      {user?.isLoginFirstTime && showLoginDialog && (
        <LoginDialog onClick={handleClick} />
      )}
      {showLoginAward && (
        <>
          <div className="bg-[#232322] opacity-80 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"></div>
          <LoginAward handleClaim={handleClaim} response={response} />
        </>
      )}
    </div>
  );
};
