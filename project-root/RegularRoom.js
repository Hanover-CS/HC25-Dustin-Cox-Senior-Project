//This is another file that creates several rooms. There are 3 different rooms that will be chosen at random to display
import RoomManager from "./RoomManager.js";

class RegularRoom extends Phaser.Scene {
  constructor() {
    super({ key: "RegularRoom" });
  }

  preload() {
    this.load.image("floor", "assets/floor.png");
    this.load.image("wall", "assets/wall.jpg");
    this.load.image("player", "assets/placeHolder.png");
  }

  create() {
    const worldWidth = 5000;
    const worldHeight = 5000;
    const roomWidth = 1200;
    const roomHeight = 1200;

    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setZoom(0.5);

    const roomCenterX = worldWidth / 2;
    const roomCenterY = worldHeight / 2;

    this.player = this.physics.add.sprite(roomCenterX, roomCenterY, "player");
    this.player.setCollideWorldBounds(false);
    this.player.setDepth(2); // Player depth to appear above all room elements

    this.cameras.main.startFollow(this.player);
    this.cameras.main.centerOn(roomCenterX, roomCenterY);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    const roomType = Math.floor(Math.random() * 3);
    switch (roomType) {
      case 0:
        this.createLayoutOne(roomCenterX, roomCenterY, roomWidth, roomHeight);
        break;
      case 1:
        this.createSecondRoomLayout(
          roomCenterX,
          roomCenterY,
          roomWidth,
          roomHeight,
        );
        break;
      case 2:
        this.createThirdRoomLayout(
          roomCenterX,
          roomCenterY,
          roomWidth,
          roomHeight,
        );
        break;
    }

    this.physics.add.collider(this.player, this.walls);
  }

  createLayoutOne(centerX, centerY, roomWidth, roomHeight) {
    this.add
      .image(centerX, centerY, "floor")
      .setDisplaySize(roomWidth, roomHeight)
      .setOrigin(0.5)
      .setDepth(0);
    const wallTileSize = 40;
    this.walls = this.physics.add.staticGroup();

    for (
      let y = centerY - roomHeight / 2;
      y <= centerY + roomHeight / 2;
      y += wallTileSize
    ) {
      this.walls
        .create(centerX - roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(1, 0.5)
        .refreshBody();
      this.walls
        .create(centerX + roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(0, 0.5)
        .refreshBody();
    }

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

    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    const holes = [
      { x: centerX - 300, y: centerY - 250, size: 100 },
      { x: centerX + 300, y: centerY + 250, size: 120 },
      { x: centerX - 200, y: centerY + 200, size: 80 },
      { x: centerX + 200, y: centerY - 200, size: 90 },
      { x: centerX - 400, y: centerY + 100, size: 100 },
      { x: centerX + 400, y: centerY - 100, size: 110 },
    ];

    holes.forEach((hole) => {
      graphics.fillRect(
        hole.x - hole.size / 2,
        hole.y - hole.size / 2,
        hole.size,
        hole.size,
      );
    });
    graphics.setDepth(0);
  }

  createSecondRoomLayout(centerX, centerY, roomWidth, roomHeight) {
    // Add floor to fill the room area
    this.add
      .image(centerX, centerY, "floor")
      .setDisplaySize(roomWidth, roomHeight)
      .setOrigin(0.5)
      .setDepth(0);

    // Graphics for central hole in the floor
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    const holeSize = 800;
    graphics.fillRect(
      centerX - holeSize / 2,
      centerY - holeSize / 2,
      holeSize,
      holeSize,
    );
    graphics.setDepth(0);

    // Bridges over the central hole
    const bridgeWidth = holeSize;
    const bridgeHeight = 40;

    const horizontalBridge = this.add.tileSprite(
      centerX,
      centerY,
      bridgeWidth,
      bridgeHeight,
      "floor",
    );
    horizontalBridge.setTileScale(1, bridgeHeight / 40);
    horizontalBridge.setDepth(1);

    const verticalBridge = this.add.tileSprite(
      centerX,
      centerY,
      bridgeHeight,
      bridgeWidth,
      "floor",
    );
    verticalBridge.setTileScale(bridgeWidth / 40, 1);
    verticalBridge.setDepth(1);

    // Create walls around the room
    const wallTileSize = 40;
    this.walls = this.physics.add.staticGroup();

    // Left and right walls
    for (
      let y = centerY - roomHeight / 2;
      y <= centerY + roomHeight / 2;
      y += wallTileSize
    ) {
      this.walls
        .create(centerX - roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(1, 0.5)
        .refreshBody();
      this.walls
        .create(centerX + roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(0, 0.5)
        .refreshBody();
    }

    // Top and bottom walls
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

  createThirdRoomLayout(centerX, centerY, roomWidth, roomHeight) {
    this.add
      .image(centerX, centerY, "floor")
      .setDisplaySize(roomWidth, roomHeight)
      .setOrigin(0.5)
      .setDepth(0);
    const wallTileSize = 40;
    this.walls = this.physics.add.staticGroup();

    for (
      let y = centerY - roomHeight / 2;
      y <= centerY + roomHeight / 2;
      y += wallTileSize
    ) {
      this.walls
        .create(centerX - roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(1, 0.5)
        .refreshBody();
      this.walls
        .create(centerX + roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(0, 0.5)
        .refreshBody();
    }

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

    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    const obstacles = [
      { x: centerX - 250, y: centerY, size: 100 },
      { x: centerX + 250, y: centerY, size: 100 },
      { x: centerX, y: centerY - 250, size: 100 },
      { x: centerX, y: centerY + 250, size: 100 },
    ];

    obstacles.forEach((obstacle) => {
      graphics.fillRect(
        obstacle.x - obstacle.size / 2,
        obstacle.y - obstacle.size / 2,
        obstacle.size,
        obstacle.size,
      );
    });
    graphics.setDepth(0);
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

export default RegularRoom;
