// RoomManager.js
// Handles room transitions and door generation.

class RoomManager {
  constructor(scene) {
    console.log("RoomManager created");
    this.scene = scene;
    this.roomSequence = ["HubRoom", "RegularRoom", "Room", "RegularRoom", "RegularRoom", "RegularRoom", "Room", "ShopRoom", "BossRoom"]; // Linear sequence
    this.currentRoomIndex = 0; // Start at the first room
    this.entryPoint = 'right';
  }

  // Enter the next room in sequence
  enterNextRoom(entryPointKey = "right") {
    if (this.currentRoomIndex >= this.roomSequence.length - 1) {
      console.log("Returning to the Hub");
      this.currentRoomIndex = 0;
    } else {
      this.currentRoomIndex++;
    }
    

    const nextRoomKey = this.roomSequence[this.currentRoomIndex];
    const playerPosition = this.getEntryPoint(nextRoomKey, entryPointKey) || { x: 500, y: 500};

    const previousRoomKey = this.roomSequence[this.currentRoomIndex - 1];
    if (previousRoomKey && this.scene.scene.isActive(previousRoomKey)) {
      this.scene.scene.stop(previousRoomKey);
    }
    
    if (this.scene.scene.get(nextRoomKey)) {
      console.log(`Transitioning to ${nextRoomKey} at position`, playerPosition);
      this.scene.scene.start(nextRoomKey, playerPosition);
    } else {
      console.error(`Scene ${nextRoomKey} does not exist.`);
    }
  }

  // Define entry points
  getEntryPoint(roomKey, entryPointKey) {
    const entryPoints = {
      HubRoom: { 
        right: { x: 950, y: 500 } // Only a right door for HubRoom
      },
      RegularRoom: { 
        left: { x: 50, y: 500 }, // Left door for RegularRoom
        right: { x: 950, y: 500 } // Right door for RegularRoom
      },
      Room: { 
        left: { x: 50, y: 500 }, // Left door for Room
        right: { x: 950, y: 500 } // Right door for Room
      },
      ShopRoom: { 
        left: { x: 50, y: 500 }, // Left door for ShopRoom
        right: { x: 950, y: 500 } // Right door for ShopRoom
      },
      BossRoom: { 
        left: { x: 50, y: 500 }, // Left door for BossRoom
        right: { x: 950, y: 500 } // Right door for BossRoom
      },
    };

    return entryPoints[roomKey][entryPointKey];
  }

  // No dynamic transition, handle directly through sequence
  handleTransition(player, entryPointKey = "right") {
    if (this.currentRoomIndex < this.roomSequence.length - 1) {
      this.enterNextRoom(entryPointKey);
    } else {
      console.log("No further rooms to transition to.");
    }
  }
}

export default RoomManager;

