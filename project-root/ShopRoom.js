// This file sets up the shop room layout and will be the room where transactions will occur
class ShopRoom extends Phaser.Scene {
  constructor() {
    super({ key: "ShopRoom" });
  }

  preload() {
    // Load assets
    this.load.image("floor", "assets/floor.png");
    this.load.image("wall", "assets/wall.jpg");
    this.load.image("player", "assets/placeHolder.png");
    this.load.image("box", "assets/box.png"); // Add the box asset
    this.load.image("counter", "assets/counter.png"); // Add the counter image
  }

  create() {
    const worldWidth = 5000;
    const worldHeight = 5000;
    const roomWidth = 1000;
    const roomHeight = 1000;

    // Set up physics bounds
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Set up camera to follow player
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setZoom(0.5);

    // Center of the room
    const roomCenterX = worldWidth / 2;
    const roomCenterY = worldHeight / 2;

    // Create the player in the center
    this.player = this.physics.add.sprite(roomCenterX, roomCenterY, "player");
    this.player.setCollideWorldBounds(false);
    this.player.setDepth(1);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.centerOn(roomCenterX, roomCenterY);

    // Set up controls
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Create the room layout (floor and walls)
    this.createRoom(roomCenterX, roomCenterY, roomWidth, roomHeight);

    // Set up collisions between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Add boxes in the bottom corners and along the top wall
    this.addBoxes(roomCenterX, roomCenterY, roomWidth, roomHeight);

    // Set up collisions between player and boxes
    this.physics.add.collider(this.player, this.boxes);

    // Add the counter
    this.addCounter(roomCenterX, roomCenterY, roomWidth, roomHeight);
  }

  createRoom(centerX, centerY, roomWidth, roomHeight) {
    // Add the floor
    this.add
      .image(centerX, centerY, "floor")
      .setDisplaySize(roomWidth, roomHeight)
      .setOrigin(0.5)
      .setDepth(0);

    // Create walls as a static group
    this.walls = this.physics.add.staticGroup();
    const wallTileSize = 40;

    // Left and right walls (tiled vertically)
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

    // Top and bottom walls (tiled horizontally)
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

  addBoxes(centerX, centerY, roomWidth, roomHeight) {
    const boxSize = 40; // Size of each box

    // Create a static group for the boxes
    this.boxes = this.physics.add.staticGroup();

    // Add boxes in the bottom-left and bottom-right corners
    this.boxes
      .create(
        centerX - roomWidth / 2 + boxSize,
        centerY + roomHeight / 2 - boxSize,
        "box",
      )
      .setOrigin(0.5);
    this.boxes
      .create(
        centerX + roomWidth / 2 - boxSize,
        centerY + roomHeight / 2 - boxSize,
        "box",
      )
      .setOrigin(0.5);

    // Add a row of boxes along the top wall (between left and right walls)
    const startX = centerX - roomWidth / 2 + boxSize;
    for (let x = startX; x <= centerX + roomWidth / 2 - boxSize; x += boxSize) {
      this.boxes
        .create(x, centerY - roomHeight / 2 + boxSize, "box")
        .setOrigin(0.5);
    }
  }

  addCounter(centerX, centerY, roomWidth, roomHeight) {
    const counterWidth = 32; // Width of the counter (image size)
    const counterHeight = 32; // Height of the counter (image size)

    // Create a static group for the counter
    this.counter = this.physics.add.staticGroup();

    // Position the counter higher above the player
    const counterStartX = centerX - roomWidth / 2; // Position the counter at the left edge of the room
    const counterY = centerY - roomHeight / 2 - counterHeight + 400; // Adjusted vertical position

    // Tiling the counter image across the width of the room
    for (
      let x = counterStartX;
      x < centerX + roomWidth / 2;
      x += counterWidth
    ) {
      this.counter.create(x, counterY, "counter").setOrigin(0).setDepth(1); // Set origin to 0 to remove gaps
    }

    // Enable collision between the player and the counter
    this.physics.add.collider(this.player, this.counter);
  }

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

export default ShopRoom;
