// Room.js
// this is one file of several that creates a room and sets up its layout.
class Room extends Phaser.Scene {
  constructor(parent) {
    super({ key: "Room" });
    this.parent = parent;
    this.nextRoom = 'RegularRoom'; // Default next room
    this.entryDoor = null; // Will hold which door the player came through
  }

  preload() {
    this.load.image("floor", "assets/floor.png");
    this.load.image("wall", "assets/wall.jpg");
    this.load.image("player", "assets/placeHolder.png");
  }

  create(entryDoor = 'center') {  // Default to 'center' for HubRoom spawn
    const worldWidth = 5000;
    const worldHeight = 5000;
    const roomWidth = 1200;
    const roomHeight = 1200;

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setZoom(0.5);

    // Set the entry door (top, bottom, right, or center)
    this.entryDoor = entryDoor;

    // Spawn player based on entry door
    this.player = this.physics.add.sprite(this.getSpawnPosition(entryDoor, worldWidth, worldHeight, roomWidth, roomHeight), "player");
    this.player.setCollideWorldBounds(false);
    this.player.setDepth(1);

    this.cameras.main.startFollow(this.player);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Create the room layout
    this.createRoomLayout(worldWidth / 2, worldHeight / 2, roomWidth, roomHeight);

    // Create the doorways (left and right doors only)
    this.createDoorways(worldWidth / 2, worldHeight / 2, roomWidth, roomHeight);

    // Setup collision with walls
    this.physics.add.collider(this.player, this.walls);
  }

  // Returns the spawn position based on which door the player entered, *not entirely working*
  getSpawnPosition(entryDoor, worldWidth, worldHeight, roomWidth, roomHeight) {
    switch (entryDoor) {
      case 'left':
        return { x: worldWidth / 2 - roomWidth / 2 + 40, y: worldHeight / 2 };  // 40px offset from the left wall
      case 'right':
        return { x: worldWidth / 2 + roomWidth / 2 - 40, y: worldHeight / 2 };  // 40px offset from the right wall
      case 'center':
      default:
        return { x: worldWidth / 2, y: worldHeight / 2 };  // Center of the room for HubRoom
    }
  }

  createRoomLayout(centerX, centerY, roomWidth, roomHeight) {
    this.add
      .image(centerX, centerY, "floor")
      .setDisplaySize(roomWidth, roomHeight)
      .setOrigin(0.5)
      .setDepth(0);

    this.walls = this.physics.add.staticGroup();
    const wallTileSize = 40;

    this.createRoomWalls(centerX, centerY, roomWidth, roomHeight, wallTileSize);
  }

  createRoomWalls(centerX, centerY, roomWidth, roomHeight, wallTileSize) {
    for (let y = centerY - roomHeight / 2; y <= centerY + roomHeight / 2; y += wallTileSize) {
      this.walls.create(centerX - roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(1, 0.5)
        .refreshBody();
      this.walls.create(centerX + roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(0, 0.5)
        .refreshBody();
    }

    for (let x = centerX - roomWidth / 2; x <= centerX + roomWidth / 2; x += wallTileSize) {
      this.walls.create(x, centerY - roomHeight / 2, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setOrigin(0.5, 1)
        .refreshBody();
      this.walls.create(x, centerY + roomHeight / 2, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setOrigin(0.5, 0)
        .refreshBody();
    }
  }

  createDoorways(centerX, centerY, roomWidth, roomHeight) {
    const doorSize = 20;

    // Entry door (player enters from the left)
    this.doorEnter = this.add
      .rectangle(centerX - roomWidth / 2, centerY, doorSize, 50, 0x00ff00)
      .setOrigin(0.5, 0.5)
      .setDepth(0);
    this.physics.add.existing(this.doorEnter, true); // Static body

    // Create overlap event for entering the room
    if (this.player && this.doorEnter) {
      this.physics.add.overlap(this.player, this.doorEnter, () => {
        // Handle logic when entering the room (if needed)
      });
    }

    // Exit door (on the right side, leading to the next room)
    this.doorExit = this.add
      .rectangle(centerX + roomWidth / 2 - doorSize, centerY, doorSize, 50, 0xff0000)
      .setOrigin(0.5, 0.5)
      .setDepth(0);
    this.physics.add.existing(this.doorExit, true); // Static body for exit door

    // Add overlap for leaving the room (moving to the next room, RegularRoom)
    if (this.player && this.doorExit) {
      this.physics.add.overlap(this.player, this.doorExit, () => {
        // Transition to RegularRoom
        this.scene.start("RegularRoom");
      });
    }
  }

  update() {
    const speed = 160;
    this.player.setVelocity(0); // Stop movement when no key is pressed

    // Handle movement controls
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
