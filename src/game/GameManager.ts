import { ACTIVE_AREA, CATS_COUNT, CAT_MAX_LEVEL } from "@/constants/config";
import { CatObject } from "./models/Cat";
import { Cat } from "@/types/cat";
import { WallObject } from "./models/Wall";

import Locations from "@/game/config/locations.json";
import { LocationsData, PathData } from "@/types/location";
import { userStore } from "./store/user";
import { LAYERS } from "@/constants/layers";
import { GuestGenerator } from "./components/GuestGenerator";

export class GameManager {
    scene: Phaser.Scene;
    locationsData: LocationsData;
    paths: PathData[] = [];

    currentLocation: number = 1;
    guestGenerator: GuestGenerator;

    //Objects
    cats: Phaser.Physics.Arcade.Sprite[] = [];
    walls: Phaser.Physics.Arcade.Sprite[] = [];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.locationsData = Locations as LocationsData;
        this.currentLocation = userStore.currentLocation;
        this.paths =
            this.locationsData[`location-${this.currentLocation}`].paths;
        this.guestGenerator = new GuestGenerator(this.scene, this.paths);
    }

    createTempCats() {
        const spawnPoints = this.locationsData[`location-${this.currentLocation}`].spawnPoints;
        for (let i = 0; i < spawnPoints.length; i++) {
            const cat = new CatObject(
                this.scene,
                spawnPoints[i].x,
                spawnPoints[i].y,
                {
                    id: `Cat-${i}`,
                    assetId: Phaser.Math.Between(1, CATS_COUNT),
                    level: Phaser.Math.Between(1, CAT_MAX_LEVEL)
                }
            );
            this.cats.push(cat);
        }
    }

    createEmptyPointsForPaths() {
        for (let i = 0; i < this.paths.length; i++) {
            const path = this.paths[i];
            this.createEmptyPointsForPath(path);
        }
    }

    createEmptyPointsForSpawn () {
        const spawnPoints = this.locationsData[`location-${this.currentLocation}`].spawnPoints;
        for (let i = 0; i < spawnPoints.length; i++) {
            const point = spawnPoints[i];
            const renderedPoint = new Phaser.GameObjects.Rectangle(
                this.scene,
                point.x,
                point.y,
                8,
                8,
                0x00ff00
            ).setDepth(LAYERS.DEBUG)
            this.scene.add.existing(renderedPoint);
        }
    }

    private createEmptyPointsForPath(points: PathData) {
        const renderedPoints = [];
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const renderedPoint = new Phaser.GameObjects.Rectangle(
                this.scene,
                point.position.x,
                point.position.y,
                8,
                8,
                0x00ff00
            );
            renderedPoint.setDepth(LAYERS.DEBUG);
            renderedPoints.push(renderedPoint);
            this.scene.add.existing(renderedPoint);
        }
        return renderedPoints;
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

