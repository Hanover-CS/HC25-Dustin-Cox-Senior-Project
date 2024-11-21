//This is another file that creates several rooms. There are 3 different rooms that will be chosen at random to display
import RoomManager from "./RoomManager.js";

class RegularRoom extends Phaser.Scene {
  constructor() {
    super({ key: "RegularRoom" });
    this.roomSequence = []; // To track the sequence of rooms
  }

  preload() {
    this.load.image("floor", "assets/floor.png");
    this.load.image("wall", "assets/wall.jpg");
    this.load.image("player", "assets/placeHolder.png");
  }

  create(data) {
    const { previousRoom, sequenceIndex = 0 } = data || {};
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
    this.player.setDepth(2);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.centerOn(roomCenterX, roomCenterY);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Randomly choose one of the three room layouts
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

    // Create doors with dynamic transitions
    this.createDynamicDoors(
      roomCenterX,
      roomCenterY,
      roomWidth,
      roomHeight,
      sequenceIndex,
      previousRoom,
    );

    this.physics.add.collider(this.player, this.walls);
  }

  createDynamicDoors(centerX, centerY, roomWidth, roomHeight, sequenceIndex, previousRoom) {
    const doors = this.physics.add.staticGroup();

    // Left Door
    const leftDoorX = centerX - roomWidth / 2 + 50;
    const leftDoorY = centerY;
    const leftDoor = doors.create(leftDoorX, leftDoorY, null).setSize(20, 100).setOrigin(0.5, 0.5).setVisible(false);
    this.physics.add.existing(leftDoor, true);

    // Right Door
    const rightDoorX = centerX + roomWidth / 2 - 50;
    const rightDoorY = centerY;
    const rightDoor = doors.create(rightDoorX, rightDoorY, null).setSize(20, 100).setOrigin(0.5, 0.5).setVisible(false);
    this.physics.add.existing(rightDoor, true);

    const exitLabelLeft = this.add.text(leftDoorX - 40, leftDoorY - 10, "Left Door", { fontSize: "16px", fill: "#ffffff" });
    const exitLabelRight = this.add.text(rightDoorX - 40, rightDoorY - 10, "Right Door", { fontSize: "16px", fill: "#ffffff" });
    exitLabelLeft.setDepth(1);
    exitLabelRight.setDepth(1);

    // Define door behavior based on sequence
    if (sequenceIndex === 0) {
      // First Room
      this.physics.add.overlap(this.player, leftDoor, () => {
        this.scene.start("Room"); // Go back to the initial "Room"
      });
      this.physics.add.overlap(this.player, rightDoor, () => {
        this.scene.start("RegularRoom", { previousRoom: this, sequenceIndex: sequenceIndex + 1 });
      });
    } else if (sequenceIndex === 1) {
      // Second Room
      this.physics.add.overlap(this.player, leftDoor, () => {
        this.scene.start("RegularRoom", { previousRoom, sequenceIndex: sequenceIndex - 1 });
      });
      this.physics.add.overlap(this.player, rightDoor, () => {
        this.scene.start("RegularRoom", { previousRoom: this, sequenceIndex: sequenceIndex + 1 });
      });
    } else {
      // Last Room
      this.physics.add.overlap(this.player, leftDoor, () => {
        this.scene.start("RegularRoom", { previousRoom, sequenceIndex: sequenceIndex - 1 });
      });
      this.physics.add.overlap(this.player, rightDoor, () => {
        this.scene.start("ShopRoom"); // Transition to the ShopRoom
      });
    }
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

  // ... Remaining layout methods (SecondRoomLayout and ThirdRoomLayout) remain unchanged ...

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
