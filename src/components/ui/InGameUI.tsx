import React, { useCallback, useEffect, useRef, useState } from "react";
import { InfoBox } from "./InfoBox";
import { MenuButton } from "./MenuButton";
import { useLayoutStore } from "@/stores/layoutStore";
import { useUserStore } from "@/stores/userStore";
import { updateLoginStatus, updateStatus } from "@/requests/login";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import LoginAward from "./LoginAward";
import { getClaimable } from "@/requests/user";
import OfflineEarning from "./OfflineEarning";
import NumberFormatter from "./NumberFormat";
import { useDialogStore } from "@/stores/DialogStore";
import Dialog from "./common/Dialog";
import { useGamePlayStore } from "@/stores/GamePlayStore";
import { useGamePlay } from "@/lib/hooks/gameplay/useGamePlay";
import { useStaffStore } from "@/stores/staffStore";
import { Dot } from "lucide-react";
import { useFetchUser } from "@/lib/hooks/useUser";
import Image from "next/image";
import usePower from "@/lib/hooks/restaurant/useRestaurant";
import { Staff } from "@/types/common-types";

type Click = {
  id: number;
  name: string;
  x: number;
  y: number;
};
// type CoinRef = {
//   handleClick: () => void;
// }
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
  const [clicks, setClicks] = useState<Click[]>([]);
  const { setStartIntervalRecoverPower, setStartIntervalPostTapping } =
    useGamePlay();
  const [showLoginAward, setShowLoginAward] = useState(false);
  const [initStaff, setInitStaff] = useState<Staff | null>(null);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [
    currentPower,
    setCurrentPower,
    setMaxPower,
    decreasePower,
    coinTaping,
    resetTapping,
    increaseCoinTaping,
    increaseTaping,
    setCoinTapping,
  ] = useGamePlayStore((state) => [
    state.currentPower,
    state.setCurrentPower,
    state.setMaxPower,
    state.decreasePower,
    state.coinTaping,
    state.resetTapping,
    state.increaseCoinTapping,
    state.increaseTapping,
    state.setCoinTapping,
  ]);

  const [hideDialog, showDialog, setDialogType, setDialogContent, DialogType] =
    useDialogStore((state) => [
      state.hide,
      state.show,
      state.setDialogType,
      state.setDialogContent,
      state.type,
    ]);
  const [restaurantUpgradeConfigs, currentRestaurant] = useRestaurantStore(
    (state) => [state.restaurantUpgradeConfigs, state.currentRestaurant]
  );
  const [showOfflineEarning, setShowOfflineEarning] = useLayoutStore(
    (state) => [state.showOfflineEarning, state.setShowOfflineEarning]
  );
  const [claimableData, setClaimableData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const power = usePower(currentRestaurant!._id);
  const [staffs, staffUpgradeConfigs] = useStaffStore((state) => [
    state.staffs,
    state.staffUpgradeConfigs,
  ]);
  // const telegramData = useInitData()
  const [showNotiCatUpgrade, setShowNotiCatUpgrade] = useState(false);
  const [showNotiRestaurantUpgrade, setShowNotiRestaurantUpgrade] =
    useState(false);
  const { fetchUser } = useFetchUser();
  const { handleClaim } = useGamePlay();
  const containerRef = useRef<HTMLDivElement>(null);

  const checkStaffsUpgrade = () => {
    setShowNotiCatUpgrade(false);
    if (!user) {
      return;
    }
    const isUpgradePossible = staffs.some((staff) =>
      staffUpgradeConfigs.some(
        (config) => staff.level + 1 === config.level && config.fee < user.bean
      )
    );
    if (isUpgradePossible) {
      setShowNotiCatUpgrade(true);
    }
  };

  const checkRestaurantUpgrade = () => {
    setShowNotiRestaurantUpgrade(false);
    if (!user || !currentRestaurant) {
      return;
    }
    const isUpgradePossible = restaurantUpgradeConfigs.some(
      (config) =>
        currentRestaurant.level + 1 === config.level && config.fee < user.bean
    );
    if (isUpgradePossible) {
      setShowNotiRestaurantUpgrade(true);
    }
  };

  const handleOnClick = () => {
    setShowOfflineEarning(false);
    setStartIntervalRecoverPower(true);
    setStartIntervalPostTapping(true);
  };

  const handleClick = async () => {
    if (DialogType === "login") {
      try {
        const response = await updateLoginStatus();
        if (response) {
          setInitStaff(response);
        }
      } catch (error) {
        console.log("Error updating login status", error);
      }
      setShowLoginAward(true);
    }
    hideDialog();
  };
  const handleClaimFirstTimeLogin = async () => {
    try {
      const response = await updateStatus();
      if (response) {
        setUser(response);
      }
      throw new Error("Error updating status");
    } catch (error) {
      console.log("Create error", error);
    }
    setShowLoginAward(false);
    setStartIntervalRecoverPower(true);
    setStartIntervalPostTapping(true);
  };

  let homeUrl = "/icons/ic-home.png";
  let staffUrl = "/icons/ic-staff.png";
  let manageUrl = "/icons/ic-manage.png";
  let shopUrl = "/icons/ic-shop.png";
  let friendUrl = "/icons/ic-friend.png";
  switch (currentRestaurant?.order) {
    case 2:
      homeUrl = "/icons/ic-home-2.png";
      staffUrl = "/icons/ic-staff-2.png";
      manageUrl = "/icons/ic-manage-2.png";
      shopUrl = "/icons/ic-shop-2.png";
      friendUrl = "/icons/ic-friend-2.png";
      break;
    case 3:
      homeUrl = "/icons/ic-home-3.png";
      staffUrl = "/icons/ic-staff-3.png";
      manageUrl = "/icons/ic-manage-3.png";
      shopUrl = "/icons/ic-shop-3.png";
      friendUrl = "/icons/ic-friend-3.png";
      break;
  }
  const handleTaptapLayoutClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // event.preventDefault()
      // event.stopPropagation()
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newClick: Click = {
          id: clicks.length,
          name: "postion",
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        setClicks([...clicks, newClick]);
        setTimeout(() => {
          setClicks((currentClicks) =>
            currentClicks.filter((click) => click.id !== newClick.id)
          );
        }, 1000);
      }
      // triggerCoinAnimation()
      decreasePower();
      increaseCoinTaping();
      increaseTaping();
    },
    [clicks]
  );
  useEffect(() => {
    resetTapping();
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
    if (user) {
      setCurrentPower(user.currentTabs);
      setMaxPower(user.maxTabs);
      setCoinTapping(Number(user.bean));
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
    if (user?.bean) {
      setCoinTapping(Number(user?.bean));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.bean]);

  useEffect(() => {
    handleClaim();
    fetchUser();
    if (user?.isLoginFirstTime) {
      setDialogType("login");
      setDialogContent({
        title: "Congratulation!",
        content:
          "You received a new comer gift. Open it to get your first staff.",
        buttonText: "Open",
        imgUrl: "/images/login.png",
      });
      showDialog();
    }
    useRestaurantStore.setState({ power: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  useEffect(() => {
    checkStaffsUpgrade();
    checkRestaurantUpgrade();
  }, [user]);

  return (
    <div className="absolute game-ui top-0">
      <div className="absolute flex w-full justify-around py-4">
        <InfoBox
          key="branch"
          icon={{ url: "/images/coin.png" }}
          content={user ? <NumberFormatter value={coinTaping!} /> : "0"}
        />
        {/* <NumberFormatter value={coinTaping!} />  */}
        <InfoBox
          key="branchSPD"
          content={currentPower ? currentPower : "0"}
          icon={{
            url: "/images/kbuck.png",
          }}
        />
        <InfoBox
          key="totalSPD"
          content={power ? power + "/s" : "0/s"}
          icon={{
            url: "/images/speed.png",
          }}
        />
      </div>
      <div
        ref={containerRef}
        className="absolute w-full h-[52.5%] top-[36%] bg-transparent z-8"
        onClick={(e) => handleTaptapLayoutClick(e)}
      >
        {clicks.map((click) => (
          <>
            <div
              key={`${click.name}-${click.id}-${click.x}`}
              className="clickNumber text-white z-10 flex justify-center gap-x-1 items-center text-3xl"
              style={{ left: click?.x, top: click?.y }}
            >
              <div className="">+5</div>
              <Image src="/images/coin.png" width={24} height={24} alt="icon" />
            </div>
            {/* <Coin postionX={click?.x} postionY={click?.y} ref={coinRef} /> */}
          </>
        ))}
      </div>
      <div className="absolute flex w-full justify-between bottom-4 px-8">
        <MenuButton
          key="home"
          title="Home"
          onClick={() => setShowRestaurantPanel(true)}
          icon={{
            url: homeUrl,
          }}
        />
        <div className="relative">
          <MenuButton
            key="list"
            title="List"
            icon={{
              url: staffUrl,
            }}
            onClick={() => setShowStaffPanel(true)}
          />
          {showNotiCatUpgrade && (
            <div className="absolute -top-6 -right-6 pointer-events-none">
              <Dot size={56} color="red" />
            </div>
          )}
        </div>
        <div className="relative">
          <MenuButton
            key="manage"
            title="Manage"
            icon={{
              url: manageUrl,
            }}
            onClick={() => setShowManagePanel(true)}
          />
          {showNotiRestaurantUpgrade && (
            <div className="absolute -top-6 -right-6 pointer-events-none">
              <Dot size={56} color="red" />
            </div>
          )}
        </div>
        <MenuButton
          key="shop"
          title="Shop"
          icon={{
            url: shopUrl,
          }}
          onClick={() => setShowShopPanel(true)}
        />
        <MenuButton
          key="friend"
          title="Friend"
          icon={{
            url: friendUrl,
          }}
          onClick={() => setShowFriendPanel(true)}
        />
      </div>
      {/* {user?.isLoginFirstTime && showLoginDialog && (
        <LoginDialog onClick={handleClick} />
      )} */}

      {/* refactor dialog using reusable components, using state management in DialogStore */}
      <Dialog onClick={handleClick} />

      {showLoginAward && (
        <>
          <div className="bg-[#232322] opacity-80 absolute w-[384px] h-[608px] items-center flex justify-center top-0 left-0 z-10"></div>
          <LoginAward
            handleClaim={handleClaimFirstTimeLogin}
            response={initStaff}
          />
        </>
      )}
      {!loading && user && !user.isLoginFirstTime && showOfflineEarning && (
        <OfflineEarning onClick={handleOnClick} data={claimableData} />
      )}
    </div>
  );
};
