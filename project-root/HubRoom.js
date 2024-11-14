// HubRoom.js
//The main home of the player, this is where the player starts and returns too
//where the player will be able to eventually see what they have collected and upgrade their weapon
class HubRoom extends Phaser.Scene {
    constructor(parent) {
        super({ key: 'HubRoom' });
        this.parent = parent;
    }

    preload() {
        this.load.image('floor', 'assets/floor.png');
        this.load.image('wall', 'assets/wall.jpg');
        this.load.image('player', 'assets/placeHolder.png');
    }

    create() {
        const worldWidth = 5000;   // Overall world width for free movement and expansion
        const worldHeight = 5000;  // Overall world height

        const roomWidth = 1000;    // Reduced room dimensions (adjustable)
        const roomHeight = 1000;

        // Set the physics world bounds to the large world size
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        // Set the camera to follow the player
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);  // Large world space
        this.cameras.main.setZoom(0.5);  // Adjust zoom to see more of the world

        // Set the camera's position to follow the player
        const roomCenterX = worldWidth / 2;
        const roomCenterY = worldHeight / 2;

        // Create the player in the center of the initial room
        this.player = this.physics.add.sprite(roomCenterX, roomCenterY, 'player');
        this.player.setCollideWorldBounds(false);  // Remove collision with world bounds for free movement

        // Set the player's depth to appear on top of the floor
        this.player.setDepth(1);

        // Camera follows the player and centers on them
        this.cameras.main.startFollow(this.player);
        this.cameras.main.centerOn(roomCenterX, roomCenterY);  // Center on the room

        // Add keyboard controls for player movement
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Call function to create the room layout
        this.createRoom(roomCenterX, roomCenterY, roomWidth, roomHeight);

        // Set up collisions with walls
        this.physics.add.collider(this.player, this.walls);  // Make player collide with walls
    }

    createRoom(centerX, centerY, roomWidth, roomHeight) {
        // Add floor centered in the room
        this.add.image(centerX, centerY, 'floor').setDisplaySize(roomWidth, roomHeight).setOrigin(0.5).setDepth(0);

        // Create walls as a static group for physics collision
        this.walls = this.physics.add.staticGroup();
        const wallTileSize = 40;

        // Add left and right walls (tiled vertically)
        for (let y = centerY - roomHeight / 2; y <= centerY + roomHeight / 2; y += wallTileSize) {
            let leftWall = this.walls.create(centerX - roomWidth / 2, y, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .setSize(wallTileSize, wallTileSize)
                .setOrigin(1, 0.5)
                .setDepth(0)
                .refreshBody();
            let rightWall = this.walls.create(centerX + roomWidth / 2, y, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .setSize(wallTileSize, wallTileSize)
                .setOrigin(0, 0.5)
                .setDepth(0)
                .refreshBody();
        }

        // Add top and bottom walls (tiled horizontally)
        for (let x = centerX - roomWidth / 2; x <= centerX + roomWidth / 2; x += wallTileSize) {
            let topWall = this.walls.create(x, centerY - roomHeight / 2, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .setOrigin(0.5, 1)
                .setDepth(0)
                .refreshBody();
            let bottomWall = this.walls.create(x, centerY + roomHeight / 2, 'wall')
                .setDisplaySize(wallTileSize, wallTileSize)
                .setOrigin(0.5, 0)
                .setDepth(0)
                .refreshBody();
        }

        // Create a simple rectangle doorway
        this.createDoorways(centerX, centerY, roomWidth, roomHeight);
    }

    createDoorways(centerX, centerY, roomWidth, roomHeight) {
        // Create a simple rectangle doorway on the right wall
        this.doorRight = this.add.rectangle(centerX + roomWidth / 2 - 20, centerY, 20, 50, 0x00ff00)
            .setOrigin(0.5, 0.5)
            .setDepth(0);
        this.physics.add.existing(this.doorRight, true); // Make it a static body

        // Add overlap for scene transition
        if (this.player && this.doorRight) {
            this.physics.add.overlap(this.player, this.doorRight, () => {
                this.scene.start('RegularRoom');
            });
        }
    }

    update() {
        const speed = 160;
        this.player.setVelocity(0); // Stop movement when no key is pressed

        // Handle player movement
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

export default HubRoom;
