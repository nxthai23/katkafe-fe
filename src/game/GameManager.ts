import { ACTIVE_AREA } from "@/constants/config";
import tempData from "../mock/cat.json";
import { CatObject } from "./models/Cat";
import { Cat } from "@/types/cat";
import { WallObject } from "./models/Wall";

export class GameManager {
    scene: Phaser.Scene;
    cats: Phaser.Physics.Arcade.Sprite[];
    walls: Phaser.Physics.Arcade.Sprite[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.cats = [];
        this.walls = [];
    }

    createTempCats() {
        const catData = tempData as Cat;
        for (let i = 0; i < 10; i++) {
            const cat = new CatObject(
                this.scene,
                Phaser.Math.Between(
                    ACTIVE_AREA.START_X,
                    ACTIVE_AREA.END_X - 64
                ),
                Phaser.Math.Between(
                    ACTIVE_AREA.START_Y,
                    ACTIVE_AREA.END_Y - 64
                ),
                catData
            );
            this.cats.push(cat);
        }
    }

    createEmptyPointsForPaths() {

    }

    createWalls() {
        this.walls = [
            new WallObject(this.scene, 0, 358, 36, 296),
            new WallObject(this.scene, 384 / 2 - 16, 226, 384, 32),
            new WallObject(this.scene, 384 - 36, 358, 32, 296),
            new WallObject(this.scene, 384 / 2 - 16, 608 - 64, 384, 32),
        ];
    }
}

