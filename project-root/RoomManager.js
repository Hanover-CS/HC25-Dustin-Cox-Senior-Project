// RoomManager.js
//The place that handles the room transitions and door generation.

class RoomManager {
  constructor(scene) {
    this.scene = scene;
    this.currentRoom = "GameScene"; // Default starting room
  }

  enterRoom(roomKey, entryPointKey) {
    if (this.scene.scene.isActive(roomKey)) return;

    const playerPosition = this.getEntryPoint(roomKey, entryPointKey);

    // Stop the current room and start the new one, passing entry point data
    this.scene.scene.stop(this.currentRoom);
    this.scene.scene.start(roomKey, {
      x: playerPosition.x,
      y: playerPosition.y,
    });

    // Update the current room to the new one
    this.currentRoom = roomKey;
  }

  getEntryPoint(roomKey, entryPointKey) {
    const entryPoints = {
      GameScene: {
        top: { x: 500, y: 50 },
        bottom: { x: 500, y: 950 },
        left: { x: 50, y: 500 },
        right: { x: 950, y: 500 },
      },
      ShopRoom: {
        top: { x: 500, y: 50 },
        bottom: { x: 500, y: 950 },
        left: { x: 50, y: 500 },
        right: { x: 950, y: 500 },
      },
      BossRoom: {
        top: { x: 500, y: 50 },
        bottom: { x: 500, y: 950 },
        left: { x: 50, y: 500 },
        right: { x: 950, y: 500 },
      },
    };

    return entryPoints[roomKey][entryPointKey];
  }

  handleTransition(player) {
    const playerX = player.x;
    const playerY = player.y;
    const bounds = this.scene.physics.world.bounds;

    // Example transition conditions based on player position
    if (this.currentRoom === "GameScene") {
      if (playerX > bounds.width - 50) {
        // Right edge transition to ShopRoom
        this.enterRoom("ShopRoom", "left");
      } else if (playerY < 50) {
        // Top edge transition to BossRoom
        this.enterRoom("BossRoom", "bottom");
      }
    } else if (this.currentRoom === "ShopRoom") {
      if (playerX < 50) {
        // Left edge transition back to GameScene
        this.enterRoom("GameScene", "right");
      }
    } else if (this.currentRoom === "BossRoom") {
      if (playerY > bounds.height - 50) {
        // Bottom edge transition back to GameScene
        this.enterRoom("GameScene", "top");
      }
    }
  }
}

export default RoomManager;
