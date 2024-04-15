import {
    CATS_COUNT,
    CATS_FRAME_RATE,
    LOCATIONS_COUNT,
    LOCATION_ASSETS,
} from "@/constants/config";
import { waitForSeconds } from "@/utils/helpers";
import { GameObjects, Scene } from "phaser";
import { drawBackground } from "../utils/ui/sprite";
import { CAT_ANIMATIONS } from "@/constants/anims";
import { DIALOG_TYPES } from "@/constants/dialog";
import { CAT_AUDIO_COUNT, GUEST_AUDIO_COUNT } from "@/constants/audio";

export class Preloader extends Scene {
    background: GameObjects.Image;
    txtLoading: GameObjects.Text;
    sptLoadingCat: GameObjects.Sprite;

    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here

        this.background = drawBackground(this, "background");

        // //  A simple progress bar. This is the outline of the bar.
        // this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        // //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        // const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        // //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        // this.load.on('progress', (progress: number) => {

        //     //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
        //     bar.width = 4 + (460 * progress);

        // });

        this.sptLoadingCat = this.add
            .sprite(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                "loading-cat"
            )
            .play("walking");

        this.txtLoading = this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 +
                    this.sptLoadingCat.height / 2 +
                    16,
                "Prepare to open...",
                {
                    fontFamily: "Pixelify Sans",
                    fontSize: 22,
                    color: "#000000",
                    stroke: "#ffffff",
                    strokeThickness: 4,
                    align: "center",
                    shadow: {
                        offsetX: 0,
                        offsetY: 4,
                        color: "#00000033",
                        fill: true,
                    },
                }
            )
            .setOrigin(0.5)
            .setDepth(100);
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath("assets");
        this.loadLocationAssets();
        this.loadCatSpriteSheets();
        this.loadDialogs();
        this.loadAudios();
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.waitBeforeGoToGame();
    }

    loadLocationAssets() {
        //@TODO: Load location based on data from server
        for (let i = 1; i < LOCATIONS_COUNT + 1; i++) {
            this.load.image(
                `${LOCATION_ASSETS.BACKGROUND}-${i}`,
                `locations/location-${i}/${LOCATION_ASSETS.BACKGROUND}.png`
            );
            this.load.image(
                `${LOCATION_ASSETS.BTN_FRIEND}-${i}`,
                `locations/location-${i}/${LOCATION_ASSETS.BTN_FRIEND}.png`
            );
            this.load.image(
                `${LOCATION_ASSETS.BTN_GACHA}-${i}`,
                `locations/location-${i}/${LOCATION_ASSETS.BTN_GACHA}.png`
            );
            this.load.image(
                `${LOCATION_ASSETS.BTN_PARTY}-${i}`,
                `locations/location-${i}/${LOCATION_ASSETS.BTN_PARTY}.png`
            );
            this.load.image(
                `${LOCATION_ASSETS.BTN_QUEST}-${i}`,
                `locations/location-${i}/${LOCATION_ASSETS.BTN_QUEST}.png`
            );
            this.load.image(
                `${LOCATION_ASSETS.BTN_RANK}-${i}`,
                `locations/location-${i}/${LOCATION_ASSETS.BTN_RANK}.png`
            );
            this.load.image(
                `${LOCATION_ASSETS.BTN_SWAP}-${i}`,
                `locations/location-${i}/${LOCATION_ASSETS.BTN_SWAP}.png`
            );
        }
    }

    loadCatSpriteSheets() {
        for (let i = 1; i < CATS_COUNT + 1; i++) {
            this.load.spritesheet(
                `Cat-${i}`,
                `/spritesheets/cats/Cat-${i}.png`,
                {
                    frameWidth: 128,
                    frameHeight: 128,
                }
            );
        }
        for (let i = 1; i < CATS_COUNT + 1; i++) {
            this.load.spritesheet(
                `Cat-${i}-Apron`,
                `/spritesheets/apron-cats/Cat-${i}-Apron.png`,
                {
                    frameWidth: 128,
                    frameHeight: 128,
                }
            );
        }
    }

    loadDialogs() {
        const dialogTypes = Object.values(DIALOG_TYPES);
        for (let i = 0; i < dialogTypes.length; i++) {
            const dialogType = dialogTypes[i];
            this.load.image(
                `Dialog-${dialogType}`,
                `/dialogs/${dialogType}.png`
            );
        }
    }

    loadAudios() {
        this.load.audio("bgm", "/audios/sound-background.wav");
        this.load.audio("ambience", "/audios/sound-ambience.wav");
        for (let i = 1; i < CAT_AUDIO_COUNT + 1; i++) {
            this.load.audio(`cat-${i}`, `/audios/sound-cat-${i}.wav`);
        }
        for (let i = 1; i < GUEST_AUDIO_COUNT + 1; i++) {
            this.load.audio(`guest-${i}`, `/audios/sound-guest-${i}.wav`);
        }
    }

    createCatAnimations() {
        for (let i = 1; i < CATS_COUNT + 1; i++) {
            this.anims.create({
                key: `Cat-${i}-${CAT_ANIMATIONS.IDLE}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}`, {
                    start: 0,
                    end: 3,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-${CAT_ANIMATIONS.SLEEP}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}`, {
                    start: 4,
                    end: 7,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-${CAT_ANIMATIONS.WALKING_DOWN}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}`, {
                    start: 8,
                    end: 11,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-${CAT_ANIMATIONS.WALKING_UP}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}`, {
                    start: 12,
                    end: 15,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-${CAT_ANIMATIONS.WALKING_RIGHT}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}`, {
                    start: 16,
                    end: 19,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-${CAT_ANIMATIONS.WALKING_LEFT}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}`, {
                    start: 20,
                    end: 23,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
        }
    }

    createCatApronAnimations() {
        for (let i = 1; i < CATS_COUNT + 1; i++) {
            this.anims.create({
                key: `Cat-${i}-Apron-${CAT_ANIMATIONS.IDLE}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}-Apron`, {
                    start: 0,
                    end: 3,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-Apron-${CAT_ANIMATIONS.SLEEP}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}-Apron`, {
                    start: 4,
                    end: 7,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-Apron-${CAT_ANIMATIONS.WALKING_DOWN}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}-Apron`, {
                    start: 8,
                    end: 11,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-Apron-${CAT_ANIMATIONS.WALKING_UP}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}-Apron`, {
                    start: 12,
                    end: 15,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-Apron-${CAT_ANIMATIONS.WALKING_RIGHT}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}-Apron`, {
                    start: 16,
                    end: 19,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
            this.anims.create({
                key: `Cat-${i}-Apron-${CAT_ANIMATIONS.WALKING_LEFT}`,
                frames: this.anims.generateFrameNumbers(`Cat-${i}-Apron`, {
                    start: 20,
                    end: 23,
                }),
                frameRate: CATS_FRAME_RATE,
                repeat: -1,
            });
        }
    }

    async waitBeforeGoToGame() {
        //@TODO: Remove this
        this.createCatAnimations();
        this.createCatApronAnimations();
        await waitForSeconds(1);
        this.scene.start("Game");
    }
}

