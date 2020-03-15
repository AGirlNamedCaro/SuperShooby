import Phaser from "phaser";

export default class settingsExample extends Phaser.Scene {
    constructor() {
        super("settingsExample");
        const player = this.player;
        let cursors = this.cursors;
    }

    init(data) {
      this.easyBombs = data.easyBombs;
    }

    preload() {
        this.load.image("tiles", "/assets/images/prefabs/marioTileset.png");
        this.load.tilemapTiledJSON("world", "/assets/mapData/marioTileset16.json")
        this.load.spritesheet('dude',
            '/assets/images/sprites/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        console.log(this.easyBombs);
        const worldMap = this.add.tilemap("world")
        const tileset = worldMap.addTilesetImage("tiles");
        const sky = worldMap.createStaticLayer("sky", [tileset], 0, 0);
        const clouds = worldMap.createStaticLayer("clouds", [tileset], 0, 0);
        const ground = worldMap.createStaticLayer("ground", [tileset], 0, 0);
        // ground.setCollisionByProperty({ collides: true }, true)
        // ground.setCollision([1, 265, 266, 299, 298])
        ground.setCollisionByExclusion(-1, true)
     
        this.player = this.physics.add.sprite(100, 450, 'dude');
        // this.scene.c
        this.player.body.setGravityY(300);
        this.physics.add.collider(this.player, ground);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            console.log('jump')
            this.player.setVelocityY(-630);
        }
    }
}
