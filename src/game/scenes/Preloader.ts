import { LOCATIONS_COUNT, LOCATION_ASSETS } from "@/constants/game";
import { waitForSeconds } from "@/utils/helpers";
import { GameObjects, Scene } from "phaser";

export class Preloader extends Scene {
    background: GameObjects.Image;
    txtLoading: GameObjects.Text;
    sptLoadingCat: GameObjects.Sprite;

    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.background = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "background"
        );
        let scaleX = this.cameras.main.width / this.background.width;
        let scaleY = this.cameras.main.height / this.background.height;
        let scale = Math.max(scaleX, scaleY);
        this.background.setScale(scale).setScrollFactor(0);

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
        this.loadLocationAssets();
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.waitBeforeGoToGame();
    }

    loadLocationAssets() {
        this.load.setPath("assets");

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

    async waitBeforeGoToGame() {
        //@TODO: Remove this
        await waitForSeconds(1);
        this.scene.start("Game");
    }
}

