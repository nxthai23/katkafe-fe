import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { getClaim } from "@/requests/user";
import { useUserStore } from "@/stores/userStore";
import { UserType } from "@/types/user";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [response, setResponse] = useState<UserType | null>(null);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);

  const clearClaimInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const handleClaim = async () => {
      try {
        const response = await getClaim();
        if (response) {
          setUser(response);
          setResponse(response);
        }
      } catch (error) {
        console.log("Error Claim", error);
      }
    };
    if (user && !user.isLoginFirstTime) {
      intervalRef.current = window.setInterval(() => {
        handleClaim();
      }, 5000);
    }

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
