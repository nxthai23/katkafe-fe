import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { GameManager } from "../GameManager";
import { GameUI } from "../ui/GameUI";
import { SoundManager } from "../SoundManager";
import { AUDIO_EVENTS, EVENT_BUS_TYPES } from "@/constants/events";
import { LAYERS } from "@/constants/layers";
import { Restaurant } from "@/types/common-types";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { getRestaurant } from "@/requests/restaurant";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;

  gameUI: GameUI;
  gameManager: GameManager;
  soundManager: SoundManager;

  restaurantSubscriber: any;

  constructor() {
    super("Game");
    this.gameUI = new GameUI(this);
    this.gameManager = new GameManager(this);
  }

  init() {
    this.gameUI.loadLocation();

    this.events.on(EVENT_BUS_TYPES.SCENE_READY, () => {
      console.log("Scene Ready!");
    });
  }

  async loadCatsByRestaurant(locationId: string) {
    const response = await getRestaurant(locationId);
    this.gameManager.createCats(response.cats);
  }

  destroy() {}

  create() {
    this.soundManager = new SoundManager(
      this,
      // @ts-ignore: Unreachable code error
      Phaser.Sound.SoundManagerCreator.create(this.game),
      // @ts-ignore: Unreachable code error
      Phaser.Sound.SoundManagerCreator.create(this.game)
    );

    this.restaurantSubscriber = useRestaurantStore.subscribe(
      (state) => state.currentRestaurant,
      (restaurant, newRestaurant) => {
        if (newRestaurant) this.loadCatsByRestaurant(newRestaurant!._id);
      }
    );

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    // this.gameManager.createTempCats();
    this.gameManager.createWalls();
    // this.gameManager.createEmptyPointsForSpawn();
    // this.gameManager.createEmptyPoints();

    // this.gameManager.guestGenerator.play();

    this.physics.world.addCollider(
      this.gameManager.cats,
      this.gameManager.walls
    );
    this.physics.world.addCollider(
      this.gameManager.cats,
      this.gameManager.cats
    );
    // this.physics.world.addCollider(
    //   this.gameManager.guestGenerator.guests,
    //   this.gameManager.walls
    // );

    // this.physics.world.addCollider(
    //   this.gameManager.guestGenerator.guests,
    //   this.gameManager.guestGenerator.guests
    // );

    EventBus.on("destroy", () => {
      this.restaurantSubscriber();
    });

    // Events
    EventBus.on(
      AUDIO_EVENTS.PLAY_SFX,
      (key: string, config?: Phaser.Types.Sound.SoundConfig) => {
        this.soundManager.playSFX(key, config);
      },
      this
    );
    EventBus.on(
      AUDIO_EVENTS.STOP_BGM,
      () => {
        this.soundManager.stopBGM();
      },
      this
    );
    EventBus.on(
      AUDIO_EVENTS.STOP_AMBIENCE,
      () => {
        this.soundManager.stopAmbience();
      },
      this
    );

    EventBus.emit(EVENT_BUS_TYPES.SCENE_READY, this);

    // Audios
    this.soundManager.playBGM();
    this.soundManager.playAmbience();
  }
}
