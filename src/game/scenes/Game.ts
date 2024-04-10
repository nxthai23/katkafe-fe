import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { GameManager } from "../GameManager";
import { GameUI } from "../ui/GameUI";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;

    gameUI: GameUI;
    gameManager: GameManager;

    constructor() {
        super("Game");
        this.gameUI = new GameUI(this);
        this.gameManager = new GameManager(this);
    }

    init() {
        this.gameUI.loadLocation();
        this.gameUI.drawCatActiveArea();
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.gameManager.createTempCats();

        EventBus.emit("current-scene-ready", this);
    }
}

