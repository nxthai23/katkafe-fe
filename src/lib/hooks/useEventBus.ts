import { EVENT_BUS_TYPES, UI_BUTTON } from "@/constants/events";
import { EventBus } from "@/game/EventBus";

export const useEventBus = () => {
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
                    break;
                case UI_BUTTON.GUIDE:
                    console.log("Guide button clicked");
                    //Open Guide UI
                    break;
                case UI_BUTTON.QUEST:
                    console.log("Quest button clicked");
                    //Open Quest UI
                    break;
                case UI_BUTTON.RANK:
                    console.log("Rank button clicked");
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

