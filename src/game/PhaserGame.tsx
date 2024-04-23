import {
    forwardRef,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import { InGameUI } from "@/components/ui/InGameUI";
import { useLayoutStore } from "@/stores/layoutStore";

import Staff from "@/components/panels/staff/UserStaffList";
import Manage from "@/components/panels/manage/Manage";
import Shop from "@/components/panels/shop/Shop";
// import Friend from "@/components/panels/friend/Friend";

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

    const [showFriendPanel, showManagePanel, showStaffPanel, showShopPanel] =
        useLayoutStore((state) => [
            state.showFriendPanel,
            state.showManagePanel,
            state.showStaffPanel,
            state.showShopPanel,
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
        EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
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
        return () => {
            EventBus.removeListener("current-scene-ready");
        };
    }, [ref]);

    return (
        <div className="mx-auto">
            <div id="game-container" className="relative">
                {isGameScene && <InGameUI />}
                {/* {showFriendPanel && <Friend />} */}
                {showStaffPanel && <Staff />}
                {showManagePanel && <Manage />}
                {showShopPanel && <Shop />}
            </div>
        </div>
    );
});
