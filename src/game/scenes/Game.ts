import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { GameManager } from "../GameManager";
import { GameUI } from "../ui/GameUI";
import Locations from "@/game/config/locations/locations.json";

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
        // this.gameUI.drawCatActiveArea();
        
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.gameManager.createTempCats();
        this.gameManager.createWalls();

        this.physics.world.addCollider(this.gameManager.cats, this.gameManager.walls)

        EventBus.emit("current-scene-ready", this);
    }
}

