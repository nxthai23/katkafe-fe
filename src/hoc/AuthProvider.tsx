import { StartLoading } from "@/components/ui/StartLoading";
import { useUserStore } from "@/stores/userStore";
import { useExpand, useInitData } from "@zakarliuka/react-telegram-web-tools";
import { useEffect, useState } from "react";
import { get } from "lodash";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const expand = useExpand();
  const telegramData = useInitData();
  const [login] = useUserStore((state) => [state.login]);

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const loginBody = {
        type: "local",
        initData: telegramData.initData,
        referralCode: telegramData.initDataUnsafe?.start_param,
      };
      await login(loginBody);
    } catch (error) {
      console.error("Error during login:", error);
      setError(get(error, "message", ""));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (telegramData.initData) {
      expand[1]?.();
      loginUser();
    }

    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telegramData.initData]);

  const renderContent = () => {
    if (isLoading) return <StartLoading></StartLoading>;
    else if (!isLoading && error)
      return <div className="text-red">{error}</div>;
    else return children;
  };

  return renderContent();
};
