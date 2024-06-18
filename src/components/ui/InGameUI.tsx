import React, { useEffect, useState } from "react";
import { InfoBox } from "./InfoBox";
import { MenuButton } from "./MenuButton";
import { useLayoutStore } from "@/stores/layoutStore";
import { useUserStore } from "@/stores/userStore";
import LoginDialog from "./LoginDialog";
import { createCat, updateLoginStatus, updateStatus } from "@/requests/login";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import LoginAward from "./LoginAward";
import { UserType } from "@/types/user";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import { useFetchRestaurants } from "@/lib/hooks/restaurant/useRestaurant";
import { getClaim, getClaimable } from "@/requests/user";
import OfflineEarning from "./OfflineEarning";
import NumberFormatter from "./NumberFormat";
import { useInitData } from "@zakarliuka/react-telegram-web-tools";

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
  const bean = useUserStore((state) => state.bean);
  const [showOfflineEarning, setShowOfflineEarning] = useLayoutStore(
    (state) => [state.showOfflineEarning, state.setShowOfflineEarning]
  );
  const [claimableData, setClaimableData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const telegramData = useInitData();

  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();

  const numberCats = 8;

  const handleOnClick = () => {
    setShowOfflineEarning(false);
  };

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
      const response = await updateStatus();
      if (response) {
        setUser(response);
        setResponse(response);
      }
      for (let i = 0; i < numberCats; i++) {
        await createCat();
      }
      throw new Error("Error updating status");
    } catch (error) {
      console.log("Create error", error);
    }
    setShowLoginAward(false);
  };

  useEffect(() => {
    const handleClaimable = async () => {
      try {
        const response = await getClaimable();
        if (response) {
          setClaimableData(response);
        }
      } catch (error) {
        console.log("Error Claimable", error);
      } finally {
        setLoading(false);
      }
    };
    if (user && !user.isLoginFirstTime && parseInt(user.bean) > 12) {
      handleClaimable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowOfflineEarning(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    const Login = async () => {
      try {
        const loginBody = {
          type: "local",
          initData: telegramData.initData,
        };
        await login(loginBody);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    Login();
    setShowLoginDialog(true);
    useRestaurantStore.setState({ power: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchRestaurants();
      await fetchStaffs();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute game-ui top-0">
      <div className="absolute flex w-full justify-between px-2 py-4">
        <InfoBox
          key="branch"
          title="Balance"
          content={user ? <NumberFormatter value={parseInt(user.bean)} /> : "0"}
        />
        <InfoBox
          key="branchSPD"
          title="Branch SPD"
          content={user?.bean ? power + "/s" : "0/s"}
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
      {!loading && user && !user.isLoginFirstTime && showOfflineEarning && (
        <OfflineEarning onClick={handleOnClick} data={claimableData} />
      )}
    </div>
  );
};
