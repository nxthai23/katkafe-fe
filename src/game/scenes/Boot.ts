import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.setPath('assets');
        this.load.image('background', 'loading-bg.png');
        this.load.spritesheet('loading-cat', 'loading-cat.png', { frameWidth: 128, frameHeight: 128 });
    }

    create ()
    {
        this.anims.create({
            key: "walking",
            frames: this.anims.generateFrameNumbers("loading-cat", {
                start: 0,
                end: 3,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.start('Preloader');
    }
}
