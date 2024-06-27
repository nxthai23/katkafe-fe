import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { useGamePlay } from "@/lib/hooks/gameplay/useGamePlay";
import { useFetchUser } from "@/lib/hooks/useUser";
import { useFetchGuilds } from "@/lib/hooks/guild/useGuild";
import { useFetchRestaurants } from "@/lib/hooks/restaurant/useRestaurant";
import { useFetchStaffs } from "@/lib/hooks/cat/useStaff";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const { clearClaimInterval } = useGamePlay()
  const { fetchUser } = useFetchUser();
  const { fetchGuilds } = useFetchGuilds();
  const { fetchRestaurants } = useFetchRestaurants();
  const { fetchStaffs } = useFetchStaffs()

  useEffect(() => {
    fetchUser()
    fetchGuilds()
    fetchRestaurants()
    fetchStaffs()
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
