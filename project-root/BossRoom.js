// BossRoom.js
// This is the file that creates the boss room layout and where the player
// will fight the boss before returning to the hub
class BossRoom extends Phaser.Scene {
  constructor(parent) {
    super({ key: "BossRoom" });
    this.parent = parent;
  }

  preload() {
    this.load.image("floor", "assets/floor.png");
    this.load.image("wall", "assets/wall.jpg");
    this.load.image("player", "assets/placeHolder.png");
    this.load.image("rock", "assets/rocks.png"); // Load the rock image
  }

  create() {
    const worldWidth = 5000;
    const worldHeight = 5000;
    const roomWidth = 1000;
    const roomHeight = 1000;

    // Set physics world bounds and camera
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setZoom(0.5);

    const roomCenterX = worldWidth / 2;
    const roomCenterY = worldHeight / 2;

    // Create the player at the center of the room
    this.player = this.physics.add.sprite(roomCenterX, roomCenterY, "player");
    this.player.setCollideWorldBounds(false);
    this.player.setDepth(1);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.centerOn(roomCenterX, roomCenterY);

    // Set up player movement controls
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Create the basic room layout (floor and walls)
    this.createRoom(roomCenterX, roomCenterY, roomWidth, roomHeight);

    // Add rocks as obstacles
    this.addRocks(roomCenterX, roomCenterY, roomWidth, roomHeight);

    // Enable collision between player and walls/rocks
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.player, this.rocks);
  }

  createRoom(centerX, centerY, roomWidth, roomHeight) {
    // Floor
    this.add
      .image(centerX, centerY, "floor")
      .setDisplaySize(roomWidth, roomHeight)
      .setOrigin(0.5)
      .setDepth(0);

    // Create walls as a static group
    this.walls = this.physics.add.staticGroup();
    const wallTileSize = 40;

    // Left and right walls (vertical tiling)
    for (
      let y = centerY - roomHeight / 2;
      y <= centerY + roomHeight / 2;
      y += wallTileSize
    ) {
      this.walls
        .create(centerX - roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setOrigin(1, 0.5)
        .refreshBody();
      this.walls
        .create(centerX + roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setOrigin(0, 0.5)
        .refreshBody();
    }

    // Top and bottom walls (horizontal tiling)
    for (
      let x = centerX - roomWidth / 2;
      x <= centerX + roomWidth / 2;
      x += wallTileSize
    ) {
      this.walls
        .create(x, centerY - roomHeight / 2, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setOrigin(0.5, 1)
        .refreshBody();
      this.walls
        .create(x, centerY + roomHeight / 2, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setOrigin(0.5, 0)
        .refreshBody();
    }
  }

  addRocks(centerX, centerY, roomWidth, roomHeight) {
    // Static group for rocks
    this.rocks = this.physics.add.staticGroup();

    // Array of rock positions (several positions around the room)
    const rockPositions = [
      { x: centerX - 300, y: centerY - 250 },
      { x: centerX + 300, y: centerY - 250 },
      { x: centerX - 250, y: centerY + 250 },
      { x: centerX + 250, y: centerY + 250 },
      { x: centerX, y: centerY + 300 },
      { x: centerX - 200, y: centerY - 100 },
      { x: centerX + 200, y: centerY - 150 },
    ];

    // Create rock objects at specified positions
    rockPositions.forEach((pos) => {
      this.rocks
        .create(pos.x, pos.y, "rock")
        .setOrigin(0.5)
        .setDepth(1)
        .refreshBody();
    });
  }
  //player movement update/speed
  update() {
    const speed = 160;
    this.player.setVelocity(0);

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

export default BossRoom;
