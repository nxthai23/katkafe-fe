import {
    CAT_ANIMATIONS,
    CAT_DIRECTIONS,
    CAT_STATES,
    RANDOM_CAT_STATES,
} from "@/constants/anims";
import {
    ACTIVE_AREA,
    CAT_MAX_ANIM_DURATION,
    CAT_MAX_SPEED,
    CAT_MIN_ANIM_DURATION,
    CAT_MIN_SPEED,
    COLLISION_CATEGORIES,
} from "@/constants/config";
import { LAYERS } from "@/constants/layers";
import { Cat } from "@/types/cat";

export class CatObject extends Phaser.Physics.Arcade.Sprite {
    id: string;
    speed: number;
    state: string; //CAT_STATES
    direction: CAT_DIRECTIONS;
    assetId: number;
    catData: Cat;

    private animInterval: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x: number, y: number, data: Cat) {
        super(scene, x, y, `Cat-${data.assetId}`);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth(LAYERS.STAFF);
        this.setScale(1 / 2 * 1.2);
        this.setVelocity(0);
        this.setOrigin(0, 0);

        this.setBounce(0, 0);
        this.setCollideWorldBounds(true);
        this.setCollisionCategory(COLLISION_CATEGORIES.CAT);
        this.setCollidesWith([COLLISION_CATEGORIES.WALL, COLLISION_CATEGORIES.CAT]);

        this.body?.setSize(64, 80);

        this.id = data.id;
        this.assetId = data.assetId;
        this.catData = data;

        this.state = CAT_STATES.IDLE;
        this.direction = CAT_DIRECTIONS.DOWN;
        this.speed = Phaser.Math.Between(CAT_MIN_SPEED, CAT_MAX_SPEED);

        this.playRandomAnimation();
    }

    private playAnimation() {
        switch (this.state) {
            default:
            case CAT_STATES.IDLE:
            case CAT_STATES.ORDERING:
                this.play(`Cat-${this.assetId}-${CAT_ANIMATIONS.IDLE}`);
                this.setVelocity(0);
                break;
            case CAT_STATES.WALKING:
                const rndDirection = Phaser.Math.Between(0, 3);
                this.direction = rndDirection;

                switch (this.direction) {
                    case CAT_DIRECTIONS.UP:
                        this.play(
                            `Cat-${this.assetId}-${CAT_ANIMATIONS.WALKING_UP}`
                        );
                        this.setVelocityY(-this.speed);
                        this.setVelocityX(0);
                        break;
                    case CAT_DIRECTIONS.DOWN:
                        this.play(
                            `Cat-${this.assetId}-${CAT_ANIMATIONS.WALKING_DOWN}`
                        );
                        this.setVelocityY(this.speed);
                        this.setVelocityX(0);
                        break;
                    case CAT_DIRECTIONS.LEFT:
                        this.play(
                            `Cat-${this.assetId}-${CAT_ANIMATIONS.WALKING_LEFT}`
                        );
                        this.setVelocityX(-this.speed);
                        this.setVelocityY(0);
                        break;
                    case CAT_DIRECTIONS.RIGHT:
                        this.play(
                            `Cat-${this.assetId}-${CAT_ANIMATIONS.WALKING_RIGHT}`
                        );
                        this.setVelocityX(this.speed);
                        this.setVelocityY(0);
                        break;
                }
                break;
        }
    }

    private playRandomAnimation() {
        const randomState = this.chooseRandomState();
        this.state = randomState;
        this.playAnimation();
        if (this.animInterval) {
            this.animInterval.remove();
        }
        this.animInterval = this.scene.time.addEvent({
            delay: Phaser.Math.Between(
                CAT_MIN_ANIM_DURATION,
                CAT_MAX_ANIM_DURATION
            ),
            callback: this.playRandomAnimation,
            callbackScope: this,
            loop: false,
        });
    }

    private chooseRandomState() {
        const randomIndex = Phaser.Math.Between(
            0,
            RANDOM_CAT_STATES.length - 1
        );
        return RANDOM_CAT_STATES[randomIndex];
    }
}

