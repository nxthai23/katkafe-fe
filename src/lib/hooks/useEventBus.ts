import { EVENT_BUS_TYPES, UI_BUTTON } from "@/constants/events";
import { EventBus } from "@/game/EventBus";
import { useLayoutStore } from "@/stores/layoutStore";

export const useEventBus = () => {
  const [
    setShowQuestPanel,
    setShowRankPanel,
    setShowRollPanel,
    setShowGuildPanel,
    setShowFriendPanel,
  ] = useLayoutStore((state) => [
    state.setShowQuestPanel,
    state.setShowRankPanel,
    state.setShowRollPanel,
    state.setShowGuildPanel,
    state.setShowFriendPanel,
  ]);
  const registerUIButtonClicked = () => {
    EventBus.on(EVENT_BUS_TYPES.UI_BUTTON_CLICK, (uiButton: string) => {
      switch (uiButton) {
        case UI_BUTTON.FRIEND:
          console.log("Friend button clicked");
          setShowFriendPanel(true);
          //Open Friend UI
          break;
        case UI_BUTTON.GACHA:
          console.log("Gacha button clicked");
          // setShowRollPanel(true);
          //Open Gacha UI
          break;
        case UI_BUTTON.GUIDE:
          setShowGuildPanel(true);
          console.log("Guide button clicked");
          //Open Guide UI
          break;
        case UI_BUTTON.QUEST:
          console.log("Quest button clicked");
          // setShowQuestPanel(true);
          //Open Quest UI
          break;
        case UI_BUTTON.RANK:
          console.log("Rank button clicked");
          // setShowRankPanel(true);
          //Open Rank UI
          break;
      }
    });
  };

  const registerEventListeners = () => {
    registerUIButtonClicked();
  };

  const removeAllEventListeners = () => {
    EventBus.removeAllListeners();
  };

  const removeEventListener = (eventName: string) => {
    EventBus.removeListener(eventName);
  };

  return {
    registerEventListeners,
    removeAllEventListeners,
    removeEventListener,
  };
};
