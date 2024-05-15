import {
  GUEST_MAX_GEN_DELAY,
  GUEST_MIN_GEN_DELAY,
  MAX_GUESTS,
} from "@/constants/config";
import { GuestObject } from "../models/Guest";
import { PathData } from "@/types/location";

export class GuestGenerator {
  scene: Phaser.Scene;

  guests: GuestObject[] = [];
  paths: PathData[] = [];

  private guestGeneratorTimer: Phaser.Time.TimerEvent;
  private guestIndex: number = 0;

  constructor(scene: Phaser.Scene, paths: PathData[]) {
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

  generateGuest() {
    // if (this.guests.length < MAX_GUESTS) {
    const rndPathIndex = Phaser.Math.Between(0, this.paths.length - 1);
    this.guests.push(
      new GuestObject(
        this.scene,
        this.guestIndex,
        1,
        this.paths[rndPathIndex],
        this.removeGuest
      )
    );
    this.guestIndex++;
    // }
    this.resetGeneratorTimer();
  }

  private removeGuest(index: number) {
    console.log("index", index);
    console.log("this.guests", this.guests);
    // this.guests = this.guests.filter((g) => g.id !== index);
  }
}
