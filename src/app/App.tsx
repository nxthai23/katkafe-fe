import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { getClaim } from "@/requests/user";
import { useUserStore } from "@/stores/userStore";
import { UserType } from "@/types/user";

import { useGamePlay } from "@/lib/hooks/gameplay/useGamePlay";
import { useFetchUser } from "@/lib/hooks/useUser";
import { useFetchGuilds } from "@/lib/hooks/guild/useGuild";
import {
  useFetchRestaurants,
  useFetchRestaurantUpgradeConfigs,
} from "@/lib/hooks/restaurant/useRestaurant";
import {
  useFetchStaffs,
  useFetchStaffUpgradeConfigs,
} from "@/lib/hooks/cat/useStaff";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const { clearClaimInterval } = useGamePlay();
  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs();
  const { fetchStaffUpgradeConfigs } = useFetchStaffUpgradeConfigs();
  const { fetchRestaurantUpgradeConfigs } = useFetchRestaurantUpgradeConfigs();
  const fetchData = async () => {
    await Promise.all([
      fetchRestaurants(),
      fetchStaffs(),
      fetchStaffUpgradeConfigs(),
      fetchRestaurantUpgradeConfigs(),
    ]);
  };
  useEffect(() => {
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

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
    </div>
  );
}

export default App;
