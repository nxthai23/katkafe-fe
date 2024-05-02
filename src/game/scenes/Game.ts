import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { GameManager } from "../GameManager";
import { GameUI } from "../ui/GameUI";
import { SoundManager } from "../SoundManager";
import { AUDIO_EVENTS } from "@/constants/events";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;

  gameUI: GameUI;
  gameManager: GameManager;
  soundManager: SoundManager;

  constructor() {
    super("Game");
    this.gameUI = new GameUI(this);
    this.gameManager = new GameManager(this);
  }

  init() {
    this.gameUI.loadLocation();
  }

  create() {
    this.soundManager = new SoundManager(
      this,
      // @ts-ignore: Unreachable code error
      Phaser.Sound.SoundManagerCreator.create(this.game),
      // @ts-ignore: Unreachable code error
      Phaser.Sound.SoundManagerCreator.create(this.game)
    );

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.gameManager.createTempCats();
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

    EventBus.emit("current-scene-ready", this);

    // Audios
    this.soundManager.playBGM();
    this.soundManager.playAmbience();

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
  }
}
