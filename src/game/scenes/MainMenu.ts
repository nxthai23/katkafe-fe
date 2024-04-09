import { GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";
import { GAME_HEIGHT, GAME_WIDTH } from "@/constants/game";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super("MainMenu");
    }

    create() {
        this.background = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "background"
        );
        let scaleX = this.cameras.main.width / this.background.width;
        let scaleY = this.cameras.main.height / this.background.height;
        let scale = Math.max(scaleX, scaleY);
        this.background.setScale(scale).setScrollFactor(0);

        // this.logo = this.add.image(512, 300, 'logo').setDepth(100);

        this.anims.create({
            key: "walking",
            frames: this.anims.generateFrameNumbers("loading-cat", {
                start: 0,
                end: 3,
            }),
            frameRate: 12,
            repeat: -1,
        });

        const loadingCat = this.add
            .sprite(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                "loading-cat"
            )
            .play("walking");

        this.title = this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 + loadingCat.height / 2 + 16,
                "Prepare to open...",
                {
                    fontFamily: "Pixelify Sans",
                    fontSize: 20,
                    color: "#000000",
                    stroke: "#ffffff",
                    strokeThickness: 1,
                    align: "center",
                    shadow: {
                        offsetX: 0,
                        offsetY: 2,
                        color: "#303030",
                        blur: 0,
                    },
                }
            )
            .setOrigin(0.5)
            .setDepth(100);

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start("Game");
    }

    moveLogo(vueCallback: ({ x, y }: { x: number; y: number }) => void) {
        if (this.logoTween) {
            if (this.logoTween.isPlaying()) {
                this.logoTween.pause();
            } else {
                this.logoTween.play();
            }
        } else {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: "Back.easeInOut" },
                y: { value: 80, duration: 1500, ease: "Sine.easeOut" },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (vueCallback) {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y),
                        });
                    }
                },
            });
        }
    }
}

