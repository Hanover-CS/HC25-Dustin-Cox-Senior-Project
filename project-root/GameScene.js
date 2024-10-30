//GameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('player', 'assets/placeHolder.png');
        this.load.image('wall', 'assets/wall.jpg');
        this.load.image('floor', 'assets/floor.png');
    }

    create() {

        // Room setup (centered)
        const roomWidth = 800;
        const roomHeight = 600;
        const roomX = this.cameras.main.centerX - roomWidth / 2;
        const roomY = this.cameras.main.centerY - roomHeight / 2;

        // Floor
        this.add.image(roomX + roomWidth / 2, roomY + roomHeight / 2, 'floor').setDisplaySize(roomWidth, roomHeight);

        // Wall setup with texture and depth perspective
        const wallThickness = 20;
        this.walls = this.physics.add.staticGroup();

        // Top wall 
        const topWall = this.add.tileSprite(roomX + roomWidth / 2, roomY, roomWidth, wallThickness * 2, 'wall')
            .setOrigin(0.5, 1); // Top wall aligned with the top
        this.walls.add(topWall);

        //  bottom wall
        const bottomWall = this.add.tileSprite(roomX + roomWidth / 2, roomY + roomHeight, roomWidth, wallThickness * 2, 'wall')
            .setOrigin(0.5, 0);
        this.walls.add(bottomWall);

        // Left wall
        const leftWall = this.add.tileSprite(roomX, roomY + roomHeight / 2, wallThickness * 2, roomHeight, 'wall')
            .setOrigin(1, 0.5); // Left wall aligned with the left edge
        this.walls.add(leftWall);

        // Right wall 
        const rightWall = this.add.tileSprite(roomX + roomWidth, roomY + roomHeight / 2, wallThickness * 2, roomHeight, 'wall')
            .setOrigin(0, 0.5); // Right wall aligned with the right edge
        this.walls.add(rightWall);

        
        //corners
        const cornerSize = wallThickness * 2;
        // Top-left corner
        this.add.tileSprite(roomX - wallThickness, roomY - wallThickness, cornerSize, cornerSize, 'wall')
            .setOrigin(0.5, 0.5);
        // Top-right corner
        this.add.tileSprite(roomX + roomWidth + wallThickness, roomY - wallThickness, cornerSize, cornerSize, 'wall')
            .setOrigin(0.5, 0.5);
        // Bottom-left corner
        this.add.tileSprite(roomX - wallThickness, roomY + roomHeight + wallThickness, cornerSize, cornerSize, 'wall')
            .setOrigin(0.5, 0.5);
        // Bottom-right corner
        this.add.tileSprite(roomX + roomWidth + wallThickness, roomY + roomHeight + wallThickness, cornerSize, cornerSize, 'wall')
            .setOrigin(0.5, 0.5);


        // Set up player sprite in the center of the screen
        this.player = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'player');

        //collison
        this.physics.add.collider(this.player, this.walls);

        // wasd input
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        // Basic movement controls
        const speed = 160;
        this.player.setVelocity(0); // Stop any movement when no key is pressed

        if (this.keys.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(speed);
        }

        if (this.keys.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.keys.down.isDown) {
            this.player.setVelocityY(speed);
        }
    }
}

export default GameScene;
