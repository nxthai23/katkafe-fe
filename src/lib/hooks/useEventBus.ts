import { EVENT_BUS_TYPES, UI_BUTTON } from "@/constants/events";
import { EventBus } from "@/game/EventBus";
import { useLayoutStore } from "@/stores/layoutStore";

export const useEventBus = () => {
  const [setShowQuestPanel, setShowRankPanel, setShowRollPanel] =
    useLayoutStore((state) => [
      state.setShowQuestPanel,
      state.setShowRankPanel,
      state.setShowRollPanel,
    ]);
  const registerUIButtonClicked = () => {
    EventBus.on(EVENT_BUS_TYPES.UI_BUTTON_CLICK, (uiButton: string) => {
      switch (uiButton) {
        case UI_BUTTON.FRIEND:
          console.log("Friend button clicked");
          //Open Friend UI
          break;
        case UI_BUTTON.GACHA:
          console.log("Gacha button clicked");
          //Open Gacha UI
          setShowRollPanel(true);
          break;
        case UI_BUTTON.GUIDE:
          console.log("Guide button clicked");
          //Open Guide UI
          break;
        case UI_BUTTON.QUEST:
          console.log("Quest button clicked");
          setShowQuestPanel(true);
          //Open Quest UI
          break;
        case UI_BUTTON.RANK:
          console.log("Rank button clicked");
          //Open Rank UI
          setShowRankPanel(true);
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
