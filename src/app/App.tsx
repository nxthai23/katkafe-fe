import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { useUserStore } from "@/stores/userStore";

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
import { useExpand, useInitData } from "@zakarliuka/react-telegram-web-tools";
import { DeviceGuard } from "@/hoc/DeviceGuard";
import { set } from "lodash";
import { StartLoading } from "@/components/ui/StartLoading";
import { AuthProvider } from "@/hoc/AuthProvider";

const needDeviceGuard = process.env.NEXT_PUBLIC_NEED_DEVICE_GUARD ?? 1;

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [finnishLoading, setFinnishLoading] = useState(false);
  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();
  const { fetchStaffUpgradeConfigs } = useFetchStaffUpgradeConfigs();
  const { fetchRestaurantUpgradeConfigs } = useFetchRestaurantUpgradeConfigs();
  // const [progress, setProgress] = useState(100);

  // for (let i = 0; i < fakeProgress.length; i++) {
  //   setTimeout(() => {
  //     setProgress(fakeProgress[i]);
  //   }, i * 500); // Simulating API progress
  // }

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
      //TODO: handle error
    } finally {
      setFinnishLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const gameContent = finnishLoading ? (
    <PhaserGame ref={phaserRef} />
  ) : (
    <StartLoading />
  );

  return (
    <div id="app">
      {needDeviceGuard == 1 ? (
        <DeviceGuard>
          <AuthProvider>{gameContent}</AuthProvider>
        </DeviceGuard>
      ) : (
        gameContent
      )}
    </div>
  );
}

export default App;
