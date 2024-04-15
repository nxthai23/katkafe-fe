import { CAT_ANIMATIONS, CAT_DIRECTIONS, CAT_STATES } from "@/constants/anims";
import {
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
import { Cat } from "@/types/cat";
import { DialogObject } from "./Dialog";
import {
    getRandomCatAnimationByPercentage,
    getRandomMaxAnimationDuration,
} from "../utils/random";
import { getCatSpriteByLevel } from "../utils/anim";
import { EventBus } from "../EventBus";
import { AUDIO_EVENTS } from "@/constants/events";
import { CAT_AUDIO_COUNT } from "@/constants/audio";

export class CatObject extends Phaser.Physics.Arcade.Sprite {
    id: string;
    speed: number;
    state: string; //CAT_STATES
    direction: CAT_DIRECTIONS;
    assetId: number;
    catData: Cat;

    private dialog: DialogObject;

    private animInterval: Phaser.Time.TimerEvent;
    private dialogInterval: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x: number, y: number, data: Cat) {
        super(scene, x, y, getCatSpriteByLevel(data));

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth(LAYERS.STAFF);
        this.setScale((1 / 2) * 1.2);
        this.setVelocity(0);

        this.setBounce(0, 0);
        this.setPushable(false);
        this.setCollideWorldBounds(true);
        this.setCollisionCategory(COLLISION_CATEGORIES.CAT);
        this.setCollidesWith([
            COLLISION_CATEGORIES.WALL,
            COLLISION_CATEGORIES.CAT,
        ]);

        this.body?.setSize(64, 80);

        this.id = data.id;
        this.assetId = data.assetId;
        this.catData = data;

        this.state = CAT_STATES.WALKING;
        this.direction = CAT_DIRECTIONS.DOWN;
        this.speed = Phaser.Math.Between(CAT_MIN_SPEED, CAT_MAX_SPEED);

        this.playAnimation();
        this.resetDialogInterval();
        this.animInterval = this.scene.time.addEvent({
            delay: getRandomMaxAnimationDuration(this.state),
            callback: this.playRandomAnimation,
            callbackScope: this,
            loop: false,
        });
    }

    private playAnimation() {
        switch (this.state) {
            default:
            case CAT_STATES.IDLE:
                this.play(
                    `${getCatSpriteByLevel(this.catData)}-${
                        CAT_ANIMATIONS.IDLE
                    }`
                );
                this.setVelocity(0);
                break;
            case CAT_STATES.SLEEP:
                this.play(
                    `${getCatSpriteByLevel(this.catData)}-${
                        CAT_ANIMATIONS.SLEEP
                    }`
                );
                this.setVelocity(0);
                break;
            case CAT_STATES.WALKING:
                const rndDirection = Phaser.Math.Between(0, 3);
                this.direction = rndDirection;

                switch (this.direction) {
                    case CAT_DIRECTIONS.UP:
                        this.play(
                            `${getCatSpriteByLevel(this.catData)}-${
                                CAT_ANIMATIONS.WALKING_UP
                            }`
                        );
                        this.setVelocityY(-this.speed);
                        this.setVelocityX(0);
                        break;
                    case CAT_DIRECTIONS.DOWN:
                        this.play(
                            `${getCatSpriteByLevel(this.catData)}-${
                                CAT_ANIMATIONS.WALKING_DOWN
                            }`
                        );
                        this.setVelocityY(this.speed);
                        this.setVelocityX(0);
                        break;
                    case CAT_DIRECTIONS.LEFT:
                        this.play(
                            `${getCatSpriteByLevel(this.catData)}-${
                                CAT_ANIMATIONS.WALKING_LEFT
                            }`
                        );
                        this.setVelocityX(-this.speed);
                        this.setVelocityY(0);
                        break;
                    case CAT_DIRECTIONS.RIGHT:
                        this.play(
                            `${getCatSpriteByLevel(this.catData)}-${
                                CAT_ANIMATIONS.WALKING_RIGHT
                            }`
                        );
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
            delay: Phaser.Math.Between(
                DIALOG_MIN_GEN_DELAY,
                DIALOG_MAX_GEN_DELAY
            ),
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
            const rndIndex = Phaser.Math.Between(
                0,
                CAT_DIALOG_TYPES.length - 1
            );
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
            volume: 0.25
        });
    }
}

