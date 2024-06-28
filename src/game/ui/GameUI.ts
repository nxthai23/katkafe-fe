import {
  ACTIVE_AREA,
  ASSETS,
  ASSET_SCALE,
  GAME_HEIGHT,
  GAME_WIDTH,
  LOCATION_ASSETS,
} from "@/constants/config";
import {
  drawBackground,
  drawSprite,
  drawSpriteButton,
} from "../utils/ui/sprite";
import { LAYERS } from "@/constants/layers";
import { EventBus } from "../EventBus";
import { EVENT_BUS_TYPES, UI_BUTTON } from "@/constants/events";
import Locations from "@/game/config/locations.json";
import { LocationsData } from "@/types/location";

export class GameUI {
  locationsData: LocationsData;

  //Loading Location
  loadingBg: Phaser.GameObjects.Image;
  loadingLogo: Phaser.GameObjects.Image;
  loadingText: Phaser.GameObjects.Text;

  //Texts
  gameText: Phaser.GameObjects.Text;
  txtQuest: Phaser.GameObjects.Text;
  txtFriend: Phaser.GameObjects.Text;
  txtRank: Phaser.GameObjects.Text;

  //Images
  background: Phaser.GameObjects.Image;
  btnQuest: Phaser.GameObjects.Image;
  btnRank: Phaser.GameObjects.Image;
  btnFriend: Phaser.GameObjects.Image;

  //States
  isLoadingUI: boolean;

  scene: Phaser.Scene;
  uiGroup: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    this.isLoadingUI = false;
    this.scene = scene;
    this.locationsData = Locations as LocationsData;
  }

  drawLoadingLocation() {
    this.loadingBg = drawBackground(this.scene, ASSETS.DEFAULT_BACKGROUND);

    this.loadingLogo = drawSprite(
      this.scene,
      ASSETS.LOGO,
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      ASSET_SCALE,
      LAYERS.DEBUG
    );

    this.loadingText = this.scene.add.text(512, 384, "Opening Restaurant...", {
      fontSize: "24px",
      color: "#000",
    });
    this.loadingText.setOrigin(0.5);
    this.loadingText.setDepth(LAYERS.DEBUG);
  }

  removeLoadingLocation() {
    this.loadingBg.removeFromDisplayList();
    this.loadingLogo.removeFromDisplayList();
    this.loadingText.removeFromDisplayList();
  }

  drawLocation(currentLocation: number) {
    if (this.uiGroup && this.uiGroup.getLength() > 0)
      this.uiGroup.clear(true, true);
    else this.uiGroup = this.scene.add.group();

    const assets = this.locationsData[`location-${currentLocation}`].assets;

    this.uiGroup.add(
      drawBackground(
        this.scene,
        `${LOCATION_ASSETS.BACKGROUND}-${currentLocation}`
      )
    );

    const renderedBtnQuest = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_QUEST}-${currentLocation}`,
      assets[LOCATION_ASSETS.BTN_QUEST].x,
      assets[LOCATION_ASSETS.BTN_QUEST].y,
      ASSET_SCALE,
      LAYERS.OBJECT,
      {
        title: "Quest",
        offset: 36,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.QUEST)
    );
    this.uiGroup.add(renderedBtnQuest.sprite);
    this.uiGroup.add(renderedBtnQuest.text);

    const renderedBtnRank = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_RANK}-${currentLocation}`,
      assets[LOCATION_ASSETS.BTN_RANK].x,
      assets[LOCATION_ASSETS.BTN_RANK].y,
      ASSET_SCALE,
      LAYERS.OBJECT,
      {
        title: "Rank",
        offset: 64,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.RANK)
    );
    this.uiGroup.add(renderedBtnRank.sprite);
    this.uiGroup.add(renderedBtnRank.text);

    const renderedBtnFriend = drawSpriteButton(
      this.scene,
      `${LOCATION_ASSETS.BTN_FRIEND}-${currentLocation}`,
      assets[LOCATION_ASSETS.BTN_FRIEND].x,
      assets[LOCATION_ASSETS.BTN_FRIEND].y,
      ASSET_SCALE,
      LAYERS.OBJECT,
      {
        title: "Friend",
        offset: 64,
      },
      () => EventBus.emit(EVENT_BUS_TYPES.UI_BUTTON_CLICK, UI_BUTTON.FRIEND)
    );
    this.uiGroup.add(renderedBtnFriend.sprite);
    this.uiGroup.add(renderedBtnFriend.text);
  }
}
