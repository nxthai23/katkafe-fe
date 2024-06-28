import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { GameManager } from "../GameManager";
import { GameUI } from "../ui/GameUI";
import { SoundManager } from "../SoundManager";
import { AUDIO_EVENTS, EVENT_BUS_TYPES } from "@/constants/events";
import { useRestaurantStore } from "@/stores/restaurant/restaurantStore";
import { getRestaurant } from "@/requests/restaurant";
import { Restaurant } from "@/types/restaurant";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;

  gameUI: GameUI;
  gameManager: GameManager;
  soundManager: SoundManager;

  currentLocation: number;

  restaurantSubscriber: any;

  constructor() {
    super("Game");
    this.gameUI = new GameUI(this);
    this.gameManager = new GameManager(this);
  }

  async generateCatsByRestaurant(restaurant: Restaurant) {
    const response = await getRestaurant(restaurant._id);
    this.gameManager.createCats(response.cats, restaurant.order, true);
    // this.gameManager.generateGuests(restaurant.order, true);
  }

  onChooseNewRestaurant(restaurant?: Restaurant | null) {
    if (restaurant && this.currentLocation !== restaurant.order) {
      this.currentLocation = restaurant.order;
      this.generateCatsByRestaurant(restaurant!);
      this.gameUI.removeLoadingLocation();
      this.gameUI.drawLocation(restaurant!.order);
    }
  }

  create() {
    this.gameUI.drawLoadingLocation();
    this.soundManager = new SoundManager(
      this,
      // @ts-ignore: Unreachable code error
      Phaser.Sound.SoundManagerCreator.create(this.game),
      // @ts-ignore: Unreachable code error
      Phaser.Sound.SoundManagerCreator.create(this.game)
    );

    this.restaurantSubscriber = useRestaurantStore.subscribe(
      (state) => state.currentRestaurant,
      (newRestaurant, restaurant) => this.onChooseNewRestaurant(newRestaurant)
    );

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.gameManager.createGroups();
    this.gameManager.createWalls();

    this.physics.world.addCollider(
      this.gameManager.catGroup,
      this.gameManager.wallGroup
    );
    this.physics.world.addCollider(
      this.gameManager.catGroup,
      this.gameManager.catGroup
    );
    this.physics.world.addCollider(
      this.gameManager.guestGroup,
      this.gameManager.wallGroup
    );
    this.physics.world.addCollider(
      this.gameManager.guestGroup,
      this.gameManager.guestGroup
    );
    // this.gameManager.guestGenerator.play();

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
