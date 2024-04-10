import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { userStore } from "../store/user";
import { LOCATION_ASSETS } from "@/constants/game";
import {
    drawBackground,
    drawSprite,
    drawSpriteButton,
} from "../utils/ui/sprite";
import { LAYERS } from "@/constants/layers";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;

    //Texts
    gameText: Phaser.GameObjects.Text;
    txtQuest: Phaser.GameObjects.Text;
    txtGacha: Phaser.GameObjects.Text;
    txtParty: Phaser.GameObjects.Text;
    txtRank: Phaser.GameObjects.Text;
    txtCash: Phaser.GameObjects.Text;

    //Images
    background: Phaser.GameObjects.Image;
    btnQuest: Phaser.GameObjects.Image;
    btnGacha: Phaser.GameObjects.Image;
    btnParty: Phaser.GameObjects.Image;
    btnRank: Phaser.GameObjects.Image;
    btnFriend: Phaser.GameObjects.Image;
    btnCash: Phaser.GameObjects.Image;
    btnSwap: Phaser.GameObjects.Image;

    currentLocation: number;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.loadLocation();

        EventBus.emit("current-scene-ready", this);
    }

    loadLocation() {
        this.currentLocation = userStore.currentLocation;
        this.drawLocation();
    }

    drawLocation() {
        this.background = drawBackground(
            this,
            `${LOCATION_ASSETS.BACKGROUND}-${this.currentLocation}`
        );

        const renderedBtnQuest = drawSpriteButton(
            this,
            `${LOCATION_ASSETS.BTN_QUEST}-${this.currentLocation}`,
            64,
            64,
            1 / 2,
            LAYERS.OBJECT,
            {
                title: "Quest",
                offset: 36,
            }
        );
        this.btnQuest = renderedBtnQuest.sprite;
        this.txtQuest = renderedBtnQuest.text;

        const renderedBtnGacha = drawSpriteButton(
            this,
            `${LOCATION_ASSETS.BTN_GACHA}-${this.currentLocation}`,
            292,
            64,
            1 / 2,
            LAYERS.OBJECT,
            {
                title: "Gacha",
                offset: 64,
            }
        );
        this.btnGacha = renderedBtnGacha.sprite;
        this.txtGacha = renderedBtnGacha.text;

        const renderedBtnParty = drawSpriteButton(
            this,
            `${LOCATION_ASSETS.BTN_PARTY}-${this.currentLocation}`,
            352,
            64,
            1 / 2,
            LAYERS.OBJECT,
            {
                title: "Party",
                offset: 64,
            }
        );
        this.btnParty = renderedBtnParty.sprite;
        this.txtParty = renderedBtnParty.text;

        const renderedBtnRank = drawSpriteButton(
            this,
            `${LOCATION_ASSETS.BTN_RANK}-${this.currentLocation}`,
            288,
            226,
            1 / 2,
            LAYERS.OBJECT,
            {
                title: "Rank",
                offset: 24,
            }
        );
        this.btnRank = renderedBtnRank.sprite;
        this.txtRank = renderedBtnRank.text;

        const renderedBtnFriend = drawSpriteButton(
            this,
            `${LOCATION_ASSETS.BTN_FRIEND}-${this.currentLocation}`,
            352,
            226,
            1 / 2,
            LAYERS.OBJECT,
            {
                title: "Friend",
                offset: 24,
            }
        );
        this.btnRank = renderedBtnFriend.sprite;
        this.txtRank = renderedBtnFriend.text;

        this.btnSwap = drawSprite(
            this,
            `${LOCATION_ASSETS.BTN_SWAP}-${this.currentLocation}`,
            102,
            218,
            1 / 2,
            LAYERS.OBJECT
        );
    }
}

