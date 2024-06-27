import React, { useCallback, useEffect, useRef, useState } from "react";
import { InfoBox } from "./InfoBox";
import { MenuButton } from "./MenuButton";
import { useLayoutStore } from "@/stores/layoutStore";
import { useUserStore } from "@/stores/userStore";
import { createCat, updateLoginStatus, updateStatus } from "@/requests/login";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import LoginAward from "./LoginAward";
import { UserType } from "@/types/user";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";
import { useFetchRestaurants } from "@/lib/hooks/restaurant/useRestaurant";
import { getClaimable } from "@/requests/user";
import OfflineEarning from "./OfflineEarning";
import NumberFormatter from "./NumberFormat";
import { useInitData } from "@zakarliuka/react-telegram-web-tools";
import { useDialogStore } from "@/stores/DialogStore";
import Dialog from "./Dialog";
import { useGamePlayStore } from "@/stores/GamePlayStore";
import { postTap } from "@/requests/taptap/taptap";
import { useGamePlay } from "@/lib/hooks/gameplay/useGamePlay";
import { Coin } from "./taptap/Coin";

type Click = {
  id: number;
  x: number;
  y: number;
}
type CoinRef = {
  handleClick: () => void;
}
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
  // const coinRef = useRef<CoinRef>();
  const { setStartIntervalRecoverPower, setStartIntervalPostTapping } = useGamePlay()
  const [showLoginAward, setShowLoginAward] = useState(false);
  const [response, setResponse] = useState<UserType | null>(null);
  const power = useRestaurantStore((state) => state.power);
  const [user, login, setUser] = useUserStore((state) => [
    state.user,
    state.login,
    state.setUser,
  ]);
  const [
    currentPower,
    setCurrentPower,
    setMaxPower,
    decreasePower,
    coinTaping,
    resetTapping,
    increaseCoinTaping,
    increaseTaping,
    setCoinTapping
  ] = useGamePlayStore((state) =>
    [
      state.currentPower,
      state.setCurrentPower,
      state.setMaxPower,
      state.decreasePower,
      state.coinTaping,
      state.resetTapping,
      state.increaseCoinTapping,
      state.increaseTapping,
      state.setCoinTapping,
    ])

  const [
    hideDialog,
    showDialog,
    setDialogType,
    setDialogContent,
    DialogType
  ] = useDialogStore((state) => [
    state.hide,
    state.show,
    state.setDialogType,
    state.setDialogContent,
    state.type
  ]);
  const [showOfflineEarning, setShowOfflineEarning] = useLayoutStore(
    (state) => [state.showOfflineEarning, state.setShowOfflineEarning]
  );
  const [claimableData, setClaimableData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const telegramData = useInitData();

  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();
  const containerRef = useRef<HTMLDivElement>(null);
  const numberCats = 8;

  const handleOnClick = () => {
    setShowOfflineEarning(false);
    setStartIntervalRecoverPower(true);
    setStartIntervalPostTapping(true);
  };

  const handleClick = async () => {
    if (DialogType === 'login') {

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
    }
    hideDialog()
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
    setStartIntervalRecoverPower(true);
    setStartIntervalPostTapping(true);
  };

  // const triggerCoinAnimation = () => {
  //   if (coinRef.current) {
  //     coinRef.current.handleClick();
  //   }
  // };
  const handleTaptapLayoutClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // event.preventDefault()
    // event.stopPropagation()
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newClick: Click = {
        id: clicks.length,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      setClicks([...clicks, newClick]);
      setTimeout(() => {
        setClicks((currentClicks) => currentClicks.filter((click) => click.id !== newClick.id));
      }, 1000);
    }
    // triggerCoinAnimation()
    decreasePower()
    increaseCoinTaping()
    increaseTaping()
  }, [clicks])

  useEffect(() => {
    resetTapping()
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
      setCurrentPower(user.currentTabs)
      setMaxPower(user.maxTabs)
      setCoinTapping(Number(user.bean))
    }
    const fetchData = async () => {
      await fetchRestaurants();
      await fetchStaffs();
    };
    fetchData();
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
      setCoinTapping(Number(user?.bean))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.bean]);

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
    if (user?.isLoginFirstTime) {
      setDialogType('login')
      setDialogContent({
        title: 'Congratulation!',
        content: 'You received a new comer gift. Open it to get your first staff.',
        buttonText: 'Open',
        imgUrl: '/images/login.png'
      })
      showDialog()
    }
    useRestaurantStore.setState({ power: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  return (
    <div className="absolute game-ui top-0">
      <div className="absolute flex w-full justify-around py-4">
        <InfoBox
          key="branch"
          icon={{ url: '/images/coin.png' }}
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
      <div ref={containerRef} className="absolute w-full h-[52.5%] top-[36%] bg-transparent z-8" onClick={(e) => handleTaptapLayoutClick(e)}>
        {clicks.map((click) => (
          <>
            <div
              key={click?.id}
              className='clickNumber text-white z-10'
              style={{ left: click?.x, top: click?.y }}
            >
              +5
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
      {/* {user?.isLoginFirstTime && showLoginDialog && ( 
        <LoginDialog onClick={handleClick} />
      )} */}

      {/* refactor dialog using reusable components, using state management in DialogStore */}
      <Dialog onClick={handleClick} />

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
