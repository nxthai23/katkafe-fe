import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { getClaim } from "@/requests/user";
import { useUserStore } from "@/stores/userStore";
import { UserType } from "@/types/user";

import { useGamePlay } from "@/lib/hooks/gameplay/useGamePlay";
import {
  useFetchRestaurants,
  useFetchRestaurantUpgradeConfigs,
} from "@/lib/hooks/restaurant/useRestaurant";
import {
  useFetchStaffs,
  useFetchStaffUpgradeConfigs,
} from "@/lib/hooks/cat/useStaff";
import Image from "next/image";
import { Lightbulb } from "lucide-react";
import { useInitData } from "@zakarliuka/react-telegram-web-tools";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [finnishLoading, setFinnishLoading] = useState(false);
  const { clearClaimInterval } = useGamePlay();
  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();
  const { fetchStaffUpgradeConfigs } = useFetchStaffUpgradeConfigs();
  const { fetchRestaurantUpgradeConfigs } = useFetchRestaurantUpgradeConfigs();
  // const [progress, setProgress] = useState(100);
  const telegramData = useInitData();
  const [login] = useUserStore((state) => [state.login]);

  // for (let i = 0; i < fakeProgress.length; i++) {
  //   setTimeout(() => {
  //     setProgress(fakeProgress[i]);
  //   }, i * 500); // Simulating API progress
  // }
  const Login = async () => {
    try {
      const loginBody = {
        type: "local",
        initData: telegramData.initData,
        referralCode: telegramData.initDataUnsafe?.start_param,
      };
      await login(loginBody);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const fetchData = async () => {
    try {
      setFinnishLoading(false);
      const res = await Promise.all([
        fetchRestaurants(true),
        fetchStaffs(),
        fetchStaffUpgradeConfigs(),
        fetchRestaurantUpgradeConfigs(),
      ]);
      if (res) {
        setTimeout(() => setFinnishLoading(true), 2000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    Login();
    fetchData();
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
    }
    return () => {
      clearClaimInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadingScreen = (
    <>
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="absolute !z-10">
          <Image
            src="/images/loading.png"
            width={384}
            height={500}
            alt="icon"
          />
        </div>
        <div className="!z-20 w-[60%] flex flex-col justify-center items-center">
          <Image
            src="/images/KatKafeLogo.png"
            width={400}
            height={400}
            alt="icon"
            className="mb-6"
          />
          {/* <ProgressBar progress={progress} /> */}
        </div>
        <div className="absolute bottom-4 !z-20">
          <div className="flex gap-x-3 mt-10">
            <Lightbulb />
            <div>Tip: Tap to the screen to claim coin.</div>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <div id="app">
      {finnishLoading ? <PhaserGame ref={phaserRef} /> : loadingScreen}
    </div>
  );
}

export default App;
