import { ACTIVE_AREA, LOCATION_ASSETS } from "@/constants/config";
import { userStore } from "../store/user";
import {
  drawBackground,
  drawSprite,
  drawSpriteButton,
} from "../utils/ui/sprite";
import { LAYERS } from "@/constants/layers";
import { EventBus } from "../EventBus";
import { EVENT_BUS_TYPES, UI_BUTTON } from "@/constants/events";

export class GameUI {
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

  //States
  isLoadingUI: boolean;
  currentLocation: number;

  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.isLoadingUI = false;
    this.scene = scene;
  }

  loadLocation() {
    this.currentLocation = userStore.currentLocation;
    this.drawLocation();
  }

  drawLocation() {
    this.background = drawBackground(
      this.scene,
      `${LOCATION_ASSETS.BACKGROUND}-${this.currentLocation}`
    );

    const renderedBtnQuest = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_QUEST}-${this.currentLocation}`,
      64,
      64,
      1 / 2,
      LAYERS.OBJECT,
      {
        title: "Quest",
        offset: 36,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.QUEST)
    );
    this.btnQuest = renderedBtnQuest.sprite;
    this.txtQuest = renderedBtnQuest.text;

    const renderedBtnGacha = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_GACHA}-${this.currentLocation}`,
      292,
      64,
      1 / 2,
      LAYERS.OBJECT,
      {
        title: "Gacha",
        offset: 64,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.GACHA)
    );
    this.btnGacha = renderedBtnGacha.sprite;
    this.txtGacha = renderedBtnGacha.text;

    const renderedBtnParty = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_PARTY}-${this.currentLocation}`,
      352,
      64,
      1 / 2,
      LAYERS.OBJECT,
      {
        title: "Party",
        offset: 64,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.GUIDE)
    );
    this.btnParty = renderedBtnParty.sprite;
    this.txtParty = renderedBtnParty.text;

    const renderedBtnRank = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_RANK}-${this.currentLocation}`,
      288,
      226,
      1 / 2,
      LAYERS.OBJECT,
      {
        title: "Rank",
        offset: 24,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.RANK)
    );
    this.btnRank = renderedBtnRank.sprite;
    this.txtRank = renderedBtnRank.text;

    const renderedBtnFriend = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_FRIEND}-${this.currentLocation}`,
      352,
      226,
      1 / 2,
      LAYERS.OBJECT,
      {
        title: "",
        offset: 24,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.FRIEND)
    );
    this.btnRank = renderedBtnFriend.sprite;
    this.txtRank = renderedBtnFriend.text;

    this.btnSwap = drawSprite(
      this.scene,
      `${LOCATION_ASSETS.BTN_SWAP}-${this.currentLocation}`,
      102,
      218,
      1 / 2,
      LAYERS.OBJECT
    );
  }

  drawCatActiveArea() {
    const width = ACTIVE_AREA.END_X - ACTIVE_AREA.START_X;
    const height = ACTIVE_AREA.END_Y - ACTIVE_AREA.START_Y;
    this.scene.add
      .rectangle(
        ACTIVE_AREA.START_X,
        ACTIVE_AREA.START_Y,
        width,
        height,
        0x93bbfa,
        0.5
      )
      .setOrigin(0, 0);
  }
}
