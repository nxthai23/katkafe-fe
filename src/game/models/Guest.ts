import {
    CAT_ANIMATIONS,
    CAT_DIRECTIONS,
    GUEST_STATES,
} from "@/constants/anims";
import {
    COLLISION_CATEGORIES,
    DIALOG_MAX_DURATION,
    DIALOG_MIN_DURATION,
    GUEST_MAX_ORDER_DELAY,
    GUEST_MIN_ORDER_DELAY,
    GUEST_SPEED,
} from "@/constants/config";
import { LAYERS } from "@/constants/layers";
import { Cat } from "@/types/cat";
import { PathData } from "@/types/location";
import { ToCatDirection } from "../utils/direction";
import { DialogObject } from "./Dialog";
import {
    GUEST_LEAVE_DIALOG_TYPES,
    GUEST_ORDER_DIALOG_TYPES,
} from "@/constants/dialog";
import { EventBus } from "../EventBus";
import { AUDIO_EVENTS } from "@/constants/events";
import { GUEST_AUDIO_COUNT } from "@/constants/audio";

export class GuestObject extends Phaser.Physics.Arcade.Sprite {
    id: number;
    assetId: number;
    speed: number;
    state: string; //GUEST_STATES
    direction: CAT_DIRECTIONS;
    path: PathData;

    onDestroy?: (index: number) => void;

    currentPointIndex: number = 0;

    private worldBounds: Phaser.Geom.Rectangle;
    private dialog: DialogObject;

    constructor(
        scene: Phaser.Scene,
        id: number,
        assetId: number,
        path: PathData,
        onDestroy: (index: number) => void
    ) {
        super(scene, path[0].position.x, path[0].position.y, `Cat-${assetId}`);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth(LAYERS.GUEST);
        this.setScale((1 / 2) * 1.2);
        this.setVelocity(0);
        this.setPushable(false);

        this.setBounce(0);

        this.setCollisionCategory(COLLISION_CATEGORIES.GUEST);
        this.setCollidesWith([COLLISION_CATEGORIES.GUEST]);

        this.body?.setSize(64, 80);

        this.id = id;
        this.assetId = assetId;
        this.path = path;
        this.onDestroy = onDestroy;

        this.speed = GUEST_SPEED;
        this.state = GUEST_STATES.ARRIVING;
        this.worldBounds = scene.physics.world.bounds;

        this.direction = ToCatDirection(path[0].behavior?.direction || "down");
        this.playAnimation();
        this.setVelocityByState();

        this.scene.events.on("update", (time: number, delta: number) =>
            this.update(time, delta)
        );
    }

    update(time: number, delta: number) {
        if (!this.path || this.path.length === 0) {
            return;
        }

        if (this.body?.touching.none && this.state === GUEST_STATES.ARRIVING) {
            this.setVelocityByState();
        }

        if (
            this.x > this.worldBounds.width ||
            this.y > this.worldBounds.height ||
            this.x < 0 ||
            this.y < 0
        ) {
            this.body?.destroy();
            this.destroy();
            if (this.dialog) {
                this.dialog.destroy();
            }
        }

        if (
            this.path[this.currentPointIndex] &&
            Math.abs(this.x - this.path[this.currentPointIndex].position.x) <=
                5 &&
            Math.abs(this.y - this.path[this.currentPointIndex].position.y) <= 5
        ) {
            this.currentPointIndex++;
            // Reach end of path
            if (
                this.currentPointIndex === this.path.length &&
                this.state === GUEST_STATES.ARRIVING
            ) {
                //Change to Ordering State
                this.state = GUEST_STATES.ORDERING;

                this.showOrderDialog();
                this.setVelocityByState();
                this.playAnimation();
                this.playCatSound();
                this.scene.time.addEvent({
                    delay: Phaser.Math.Between(
                        GUEST_MIN_ORDER_DELAY,
                        GUEST_MAX_ORDER_DELAY
                    ),
                    callback: this.changeToLeaveState,
                    callbackScope: this,
                    loop: false,
                });
            }
        }
    }

    private showOrderDialog() {
        if (this.dialog) {
            this.dialog.destroy();
        }
        const rndIndex = Phaser.Math.Between(
            0,
            GUEST_ORDER_DIALOG_TYPES.length - 1
        );
        this.dialog = new DialogObject(
            this.scene,
            this,
            GUEST_ORDER_DIALOG_TYPES[rndIndex],
            1 / 4,
            16,
            -40,
            Phaser.Math.Between(DIALOG_MIN_DURATION, DIALOG_MAX_DURATION)
        );
    }

    private showLeaveDialog() {
        if (this.dialog) {
            this.dialog.destroy();
        }
        const rndIndex = Phaser.Math.Between(
            0,
            GUEST_LEAVE_DIALOG_TYPES.length - 1
        );
        this.dialog = new DialogObject(
            this.scene,
            this,
            GUEST_LEAVE_DIALOG_TYPES[rndIndex],
            1 / 4,
            16,
            -40,
            Phaser.Math.Between(DIALOG_MIN_DURATION, DIALOG_MAX_DURATION)
        );
    }

    private changeToLeaveState() {
        this.state = GUEST_STATES.LEAVING;
        this.direction = ToCatDirection(
            this.path[this.path.length - 1].behavior?.direction || "down"
        );
        this.playAnimation();
        this.playCatSound();
        this.setVelocityByState();
        this.showLeaveDialog();
    }

    setVelocityByState() {
        switch (this.state) {
            default:
            case GUEST_STATES.IDLE:
            case GUEST_STATES.ORDERING:
                this.setVelocity(0);
                break;

            case GUEST_STATES.ARRIVING:
            case GUEST_STATES.LEAVING:
                switch (this.direction) {
                    case CAT_DIRECTIONS.UP:
                        this.setVelocityY(-this.speed);
                        this.setVelocityX(0);
                        break;
                    case CAT_DIRECTIONS.DOWN:
                        this.setVelocityY(this.speed);
                        this.setVelocityX(0);
                        break;
                    case CAT_DIRECTIONS.LEFT:
                        this.setVelocityX(-this.speed);
                        this.setVelocityY(0);
                        break;
                    case CAT_DIRECTIONS.RIGHT:
                        this.setVelocityX(this.speed);
                        this.setVelocityY(0);
                        break;
                }
                break;
        }
    }

    playAnimation() {
        switch (this.state) {
            default:
            case GUEST_STATES.IDLE:
            case GUEST_STATES.ORDERING:
                this.play(`Cat-${this.assetId}-${CAT_ANIMATIONS.IDLE}`);
                break;
            case GUEST_STATES.ARRIVING:
            case GUEST_STATES.LEAVING:
                switch (this.direction) {
                    case CAT_DIRECTIONS.UP:
                        this.play(
                            `Cat-${this.assetId}-${CAT_ANIMATIONS.WALKING_UP}`
                        );
                        break;
                    case CAT_DIRECTIONS.DOWN:
                        this.play(
                            `Cat-${this.assetId}-${CAT_ANIMATIONS.WALKING_DOWN}`
                        );
                        break;
                    case CAT_DIRECTIONS.LEFT:
                        this.play(
                            `Cat-${this.assetId}-${CAT_ANIMATIONS.WALKING_LEFT}`
                        );
                        break;
                    case CAT_DIRECTIONS.RIGHT:
                        this.play(
                            `Cat-${this.assetId}-${CAT_ANIMATIONS.WALKING_RIGHT}`
                        );
                        break;
                }
                break;
        }
    }

    private playCatSound() {
        const rndIndex = Phaser.Math.Between(1, GUEST_AUDIO_COUNT);
        EventBus.emit(
            AUDIO_EVENTS.PLAY_SFX,
            `guest-${rndIndex}`,
            {
                volume: 1
            }
        );
    }
}

