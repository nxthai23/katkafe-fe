import { GameManager } from "./../GameManager";
import {
  CAT_CONFIGS,
  GUEST_MAX_GEN_DELAY,
  GUEST_MIN_GEN_DELAY,
  MAX_GUESTS,
} from "@/constants/config";
import { GuestObject } from "../models/Guest";
import { PathData } from "@/types/location";

export class GuestGenerator {
  gameManager: GameManager;
  scene: Phaser.Scene;

  paths: PathData[] = [];

  private guestGeneratorTimer: Phaser.Time.TimerEvent;

  constructor(
    gameManager: GameManager,
    scene: Phaser.Scene,
    paths: PathData[]
  ) {
    this.gameManager = gameManager;
    this.scene = scene;
    this.paths = paths;
  }

  play(startImmediately = true) {
    if (startImmediately) {
      this.generateGuest();
    }
    this.resetGeneratorTimer();
  }

  resetGeneratorTimer() {
    if (this.guestGeneratorTimer) {
      this.guestGeneratorTimer.remove();
    }
    this.guestGeneratorTimer = this.scene.time.addEvent({
      delay: Phaser.Math.Between(GUEST_MIN_GEN_DELAY, GUEST_MAX_GEN_DELAY),
      callback: this.generateGuest,
      callbackScope: this,
      loop: false,
    });
  }

  removeAllGuests() {
    this.gameManager.guestGroup.clear(true, false);
    this.guestGeneratorTimer.remove();
  }

  generateGuest() {
    if (this.gameManager.guestGroup.getLength() < MAX_GUESTS) {
      const rndPathIndex = Phaser.Math.Between(0, this.paths.length - 1);
      this.gameManager.guestGroup.add(
        new GuestObject(
          this.scene,
          this.randomGuestCatAsset(),
          this.paths[rndPathIndex]
        )
      );
    }
    this.resetGeneratorTimer();
  }

  private randomGuestCatAsset() {
    const catConfigs = this.scene.registry.get(CAT_CONFIGS);
    const rndIndex = Phaser.Math.Between(0, catConfigs.length - 1);
    return catConfigs[rndIndex].assetName;
  }
}
