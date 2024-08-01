import { CAT_ANIMATIONS, CAT_DIRECTIONS, CAT_STATES } from "@/constants/anims";
import {
  CATS_SCALE,
  CAT_BASE_COUNT,
  CAT_MAX_SPEED,
  CAT_MIN_SPEED,
  COLLISION_CATEGORIES,
  DIALOG_MAX_DURATION,
  DIALOG_MAX_GEN_DELAY,
  DIALOG_MIN_DURATION,
  DIALOG_MIN_GEN_DELAY,
} from "@/constants/config";
import { CAT_DIALOG_TYPES } from "@/constants/dialog";
import { LAYERS } from "@/constants/layers";
import { DialogObject } from "./Dialog";
import {
  getRandomCatAnimationByPercentage,
  getRandomMaxAnimationDuration,
} from "../utils/random";
import {
  getCatTextureName,
  getCatItemLayer,
  getCatSpriteByLevel,
} from "../utils/anim";
import { EventBus } from "../EventBus";
import { AUDIO_EVENTS } from "@/constants/events";
import { CAT_AUDIO_COUNT } from "@/constants/audio";
import { Staff } from "@/types/common-types";
import { get } from "lodash";
import { CatAssetType } from "@/types/cat-config";
import { CatItemObject } from "./CatItem";

export class CatObject extends Phaser.Physics.Arcade.Sprite {
  id: string;
  speed: number;
  state: string; //CAT_STATES
  direction: CAT_DIRECTIONS;
  assetId: number;
  catData: Staff;

  catBase: number;
  catHat: number;
  catBody: number;
  catFace: number;
  catCape: number;
  catLevel: number;

  //Cat Items
  private catHatItem: CatItemObject;
  private catBodyItem: CatItemObject;
  private catFaceItem: CatItemObject;
  private catCapeItem: CatItemObject;
  private catAuraItem: CatItemObject;

  private dialog: DialogObject;

  private animInterval: Phaser.Time.TimerEvent;
  private dialogInterval: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number, data: Staff) {
    super(scene, x, y, getCatTextureName(CatAssetType.Base, 1));

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.id = data._id;
    this.catData = data;
    this.catBase = get(data, "catAsset", 1);
    this.catHat = get(data, "itemAssets.head", 1);
    this.catBody = get(data, "itemAssets.body", 1);
    this.catFace = get(data, "itemAssets.face", 1);
    this.catCape = get(data, "itemAssets.cape", 1);
    this.catLevel = get(data, "numberStar", 1);

    this.setDepth(LAYERS.CAT_BASE);
    this.setScale(CATS_SCALE);
    this.setVelocity(0);
    this.setOrigin(0.5, 0.5);

    this.setBounce(0, 0);
    this.setPushable(false);
    this.setCollideWorldBounds(true);
    this.setCollisionCategory(COLLISION_CATEGORIES.CAT);
    this.setCollidesWith([COLLISION_CATEGORIES.WALL, COLLISION_CATEGORIES.CAT]);

    this.body?.setSize(64, 80);

    this.state = CAT_STATES.WALKING;
    this.direction = CAT_DIRECTIONS.DOWN;
    this.speed = Phaser.Math.Between(CAT_MIN_SPEED, CAT_MAX_SPEED);
    //Cat Items
    this.generateCatItems();

    this.playAnimation();
    this.resetDialogInterval();
    this.animInterval = this.scene.time.addEvent({
      delay: getRandomMaxAnimationDuration(this.state),
      callback: this.playRandomAnimation,
      callbackScope: this,
      loop: false,
    });
  }

  private generateCatItems() {
    if (this.catHat !== 0)
      this.catHatItem = this.generateCatItem(CatAssetType.Hat, this.catHat);
    if (this.catBody !== 0)
      this.catBodyItem = this.generateCatItem(CatAssetType.Body, this.catBody);
    if (this.catFace !== 0)
      this.catFaceItem = this.generateCatItem(CatAssetType.Face, this.catFace);
    if (this.catCape !== 0)
      this.catCapeItem = this.generateCatItem(CatAssetType.Cape, this.catCape);
    if (this.catLevel !== 0)
      this.catAuraItem = this.generateCatItem(CatAssetType.Aura, this.catLevel);
  }

  private generateCatItem(assetType: string, index: number) {
    return new CatItemObject(this.scene, this, assetType, index, 0, 0);
  }

  removedFromScene() {
    super.removedFromScene();
    if (this.body) this.body.destroy();
    if (this.dialog) this.dialog.destroy();
    if (this.animInterval) this.animInterval.remove();
    if (this.dialogInterval) this.dialogInterval.remove();
  }

  private playItemsAnimation(animName: string) {
    if (this.catHatItem) this.catHatItem.playAnimation(animName);
    if (this.catBodyItem) this.catBodyItem.playAnimation(animName);
    if (this.catFaceItem) this.catFaceItem.playAnimation(animName);
    if (this.catCapeItem) this.catCapeItem.playAnimation(animName);
    if (this.catAuraItem) this.catAuraItem.playAnimation(animName);
  }

  private playAnimation() {
    switch (this.state) {
      default:
      case CAT_STATES.IDLE:
        this.play(
          `${getCatTextureName(CatAssetType.Base, this.catBase)}-${
            CAT_ANIMATIONS.IDLE
          }`
        );
        this.playItemsAnimation(CAT_ANIMATIONS.IDLE);
        this.setVelocity(0);
        break;
      case CAT_STATES.SLEEP:
        this.play(
          `${getCatTextureName(CatAssetType.Base, this.catBase)}-${
            CAT_ANIMATIONS.SLEEP
          }`
        );
        this.playItemsAnimation(CAT_ANIMATIONS.SLEEP);
        this.setVelocity(0);
        break;
      case CAT_STATES.WALKING:
        const rndDirection = Phaser.Math.Between(0, 3);
        this.direction = rndDirection;

        switch (this.direction) {
          case CAT_DIRECTIONS.UP:
            this.play(
              `${getCatTextureName(CatAssetType.Base, this.catBase)}-${
                CAT_ANIMATIONS.WALKING_UP
              }`
            );
            this.playItemsAnimation(CAT_ANIMATIONS.WALKING_UP);
            this.setVelocityY(-this.speed);
            this.setVelocityX(0);
            break;
          case CAT_DIRECTIONS.DOWN:
            this.play(
              `${getCatTextureName(CatAssetType.Base, this.catBase)}-${
                CAT_ANIMATIONS.WALKING_DOWN
              }`
            );
            this.playItemsAnimation(CAT_ANIMATIONS.WALKING_DOWN);
            this.setVelocityY(this.speed);
            this.setVelocityX(0);
            break;
          case CAT_DIRECTIONS.LEFT:
            this.play(
              `${getCatTextureName(CatAssetType.Base, this.catBase)}-${
                CAT_ANIMATIONS.WALKING_LEFT
              }`
            );
            this.playItemsAnimation(CAT_ANIMATIONS.WALKING_LEFT);
            this.setVelocityX(-this.speed);
            this.setVelocityY(0);
            break;
          case CAT_DIRECTIONS.RIGHT:
            this.play(
              `${getCatTextureName(CatAssetType.Base, this.catBase)}-${
                CAT_ANIMATIONS.WALKING_RIGHT
              }`
            );
            this.playItemsAnimation(CAT_ANIMATIONS.WALKING_RIGHT);
            this.setVelocityX(this.speed);
            this.setVelocityY(0);
            break;
        }
        break;
    }
  }

  private playRandomAnimation() {
    const randomState = getRandomCatAnimationByPercentage();
    this.state = randomState;
    this.playAnimation();
    if (this.animInterval) {
      this.animInterval.remove();
    }
    this.animInterval = this.scene.time.addEvent({
      delay: getRandomMaxAnimationDuration(this.state),
      callback: this.playRandomAnimation,
      callbackScope: this,
      loop: false,
    });
  }

  private resetDialogInterval() {
    if (this.dialogInterval) {
      this.dialogInterval.remove();
    }
    this.dialogInterval = this.scene.time.addEvent({
      delay: Phaser.Math.Between(DIALOG_MIN_GEN_DELAY, DIALOG_MAX_GEN_DELAY),
      callback: this.showRandomDialog,
      callbackScope: this,
      loop: false,
    });
  }

  private showRandomDialog() {
    if (this.dialog) {
      this.dialog.destroy();
    }

    if (this.state !== CAT_STATES.SLEEP) {
      const rndIndex = Phaser.Math.Between(0, CAT_DIALOG_TYPES.length - 1);
      this.dialog = new DialogObject(
        this.scene,
        this,
        CAT_DIALOG_TYPES[rndIndex],
        1 / 4,
        16,
        -40,
        Phaser.Math.Between(DIALOG_MIN_DURATION, DIALOG_MAX_DURATION)
      );
    }
    this.playCatSound();
    this.resetDialogInterval();
  }

  private playCatSound() {
    const rndSound = `cat-${Phaser.Math.Between(1, CAT_AUDIO_COUNT)}`;
    EventBus.emit(AUDIO_EVENTS.PLAY_SFX, rndSound, {
      volume: 0.25,
    });
  }
}
