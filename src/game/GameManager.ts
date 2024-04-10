import { ACTIVE_AREA } from "@/constants/game";
import tempData from "../mock/cat.json";
import { CatObject } from "./models/Cat";
import { Cat } from "@/types/cat";

export class GameManager {
    scene: Phaser.Scene;
    cats: Phaser.Physics.Arcade.Sprite[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.cats = [];
    }

    createTempCats() {
        const catData = tempData as Cat;
        for (let i = 0; i < 10; i++) {
            const cat = new CatObject(
                this.scene,
                Phaser.Math.Between(ACTIVE_AREA.START_X, ACTIVE_AREA.END_X - 64),
                Phaser.Math.Between(ACTIVE_AREA.START_Y, ACTIVE_AREA.END_Y - 64),
                catData
            );
            this.cats.push(cat);
        }
    }
}

