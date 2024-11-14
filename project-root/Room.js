// Room.js
// this is one file of several that cretes a room and sets up its layout.
class Room extends Phaser.Scene {
    constructor(parent) {
        super({ key: 'Room' });
        this.parent = parent;
    }

    preload() {
        this.load.image('floor', 'assets/floor.png');
        this.load.image('wall', 'assets/wall.jpg');
        this.load.image('player', 'assets/placeHolder.png');
    }

    create() {
        const worldWidth = 5000;
        const worldHeight = 5000;
        const roomWidth = 1200;
        const roomHeight = 1200;

        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.setZoom(0.5);

        // Spawn player with space around them in the room's center
        this.player = this.physics.add.sprite(worldWidth / 2, worldHeight / 2, 'player');
        this.player.setCollideWorldBounds(false);
        this.player.setDepth(1);

        this.cameras.main.startFollow(this.player);

        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Create room layout with hallways spread further out
        this.createRoomLayout(worldWidth / 2, worldHeight / 2, roomWidth, roomHeight);

        this.physics.add.collider(this.player, this.walls);
    }

    createRoomLayout(centerX, centerY, roomWidth, roomHeight) {
        this.add.image(centerX, centerY, 'floor')
            .setDisplaySize(roomWidth, roomHeight)
            .setOrigin(0.5)
            .setDepth(0);

        this.walls = this.physics.add.staticGroup();
        const wallTileSize = 40;

        this.createRoomWalls(centerX, centerY, roomWidth, roomHeight, wallTileSize);
        this.createSpreadOutHallways(centerX, centerY, roomWidth, roomHeight, wallTileSize);
    }

    createRoomWalls(centerX, centerY, roomWidth, roomHeight, wallTileSize) {
        for (let y = centerY - roomHeight / 2; y <= centerY + roomHeight / 2; y += wallTileSize) {
            this.walls.create(centerX - roomWidth / 2, y, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .setSize(wallTileSize, wallTileSize)
                .setOrigin(1, 0.5)
                .refreshBody();
            this.walls.create(centerX + roomWidth / 2, y, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .setSize(wallTileSize, wallTileSize)
                .setOrigin(0, 0.5)
                .refreshBody();
        }

        for (let x = centerX - roomWidth / 2; x <= centerX + roomWidth / 2; x += wallTileSize) {
            this.walls.create(x, centerY - roomHeight / 2, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .setOrigin(0.5, 1)
                .refreshBody();
            this.walls.create(x, centerY + roomHeight / 2, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .setOrigin(0.5, 0)
                .refreshBody();
        }
    }

    createSpreadOutHallways(centerX, centerY, roomWidth, roomHeight, wallTileSize) {
        // Left vertical hallway - shifted further left from the center
        for (let y = -200; y <= 200; y += wallTileSize) {
            this.walls.create(centerX - 300, centerY + y, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .refreshBody();
        }

        // Right vertical hallway - shifted further right from the center
        for (let y = -200; y <= 200; y += wallTileSize) {
            this.walls.create(centerX + 300, centerY + y, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .refreshBody();
        }

        // Top horizontal hallway - shifted further up from the center
        for (let x = -400; x <= 400; x += wallTileSize) {
            this.walls.create(centerX + x, centerY - 300, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .refreshBody();
        }

        // Bottom horizontal hallway - shifted further down from the center
        for (let x = -400; x <= 400; x += wallTileSize) {
            this.walls.create(centerX + x, centerY + 300, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .refreshBody();
        }

        // Additional L-shaped hallways, even further from the center for extra space
        // Upper right L-shape
        for (let x = 0; x <= 200; x += wallTileSize) {
            this.walls.create(centerX + 450, centerY - 450 + x, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .refreshBody();
        }
        for (let y = 0; y <= 150; y += wallTileSize) {
            this.walls.create(centerX + 350 + y, centerY - 450, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .refreshBody();
        }

        // Lower left L-shape
        for (let x = 0; x <= 200; x += wallTileSize) {
            this.walls.create(centerX - 450, centerY + 350 + x, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .refreshBody();
        }
        for (let y = 0; y <= 150; y += wallTileSize) {
            this.walls.create(centerX - 350 - y, centerY + 450, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .refreshBody();
        }
    }

    update() {
        const speed = 160;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        }
    }
}

export default Room;
