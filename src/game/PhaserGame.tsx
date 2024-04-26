import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import { InGameUI } from "@/components/ui/InGameUI";
import { useLayoutStore } from "@/stores/layoutStore";

import Staff from "@/components/panels/staff/UserStaffList";
import Manage from "@/components/panels/manage/Manage";
import Friend from "@/components/panels/friend/Friend";
import { EVENT_BUS_TYPES } from "@/constants/events";
import { useEventBus } from "@/lib/hooks/useEventBus";
import Rank from "@/components/panels/rank/Rank";
import InviteInfo from "@/components/panels/invite/InviteInfo";
import Guild from "@/components/panels/guild/Guild";
import FindGuild from "@/components/panels/guild/FindGuildPanel";
import GuildDetail from "@/components/panels/guild/GuildDetailPanel";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

export const PhaserGame = forwardRef<IRefPhaserGame>(function PhaserGame(
  props,
  ref
) {
  const game = useRef<Phaser.Game | null>(null!);

  const [isGameScene, setIsGameScene] = useState(false);
  const { registerEventListeners, removeAllEventListeners } = useEventBus();

  const [
    showFriendPanel,
    showManagePanel,
    showStaffPanel,
    showShopPanel,
    showInviteInfoPanel,
    showGuildPanel,
    showFindGuildPanel,
    showRankPanel,
    showGuildDetailPanel,
  ] = useLayoutStore((state) => [
    state.showFriendPanel,
    state.showManagePanel,
    state.showStaffPanel,
    state.showShopPanel,
    state.showInviteInfoPanel,
    state.showGuildPanel,
    state.showFindGuildPanel,
    state.showRankPanel,
    state.showGuildDetailPanel,
  ]);

  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = StartGame("game-container");

      if (typeof ref === "function") {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        if (game.current !== null) {
          game.current = null;
        }
      }
    };
  }, [ref]);

  useEffect(() => {
    EventBus.on(EVENT_BUS_TYPES.SCENE_READY, (scene_instance: Phaser.Scene) => {
      if (typeof ref === "function") {
        ref({ game: game.current, scene: scene_instance });
      } else if (ref) {
        ref.current = {
          game: game.current,
          scene: scene_instance,
        };
      }

      if (scene_instance.scene.key === "Game") {
        setIsGameScene(true);
      } else {
        setIsGameScene(false);
      }
    });

    registerEventListeners();

    return () => {
      EventBus.removeListener("current-scene-ready");
      removeAllEventListeners();
    };
  }, [ref]);

  return (
    <div className="mx-auto">
      <div id="game-container" className="relative">
        {isGameScene && <InGameUI />}
        {showFriendPanel && <Friend />}
        {showStaffPanel && <Staff />}
        {showManagePanel && <Manage />}
        {showRankPanel && <Rank />}
        {showInviteInfoPanel && <InviteInfo />}
        {showGuildPanel && <Guild />}
        {showFindGuildPanel && <FindGuild />}
        {showGuildDetailPanel && <GuildDetail />}
        {/* {showShopPanel && <Shop />} */}
      </div>
    </div>
  );
});
