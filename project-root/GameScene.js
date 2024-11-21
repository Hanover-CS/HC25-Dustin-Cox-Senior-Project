//This file is the scene that displays and loads the hubroom and marks the beginning of the game
//This is where the player starts and can reflect on previous runs
//
import HubRoom from "./HubRoom.js";
import RoomManager from "./RoomManager.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("player", "assets/placeHolder.png");
    this.load.image("wall", "assets/wall.jpg");
    this.load.image("floor", "assets/floor.png");
  }

  create() {
    this.roomManager = new RoomManager(this);
    // Start with HubRoom as the first room
    this.scene.launch("HubRoom", { gameScene: this, roomManager: this.roomManager });

    // Initialize player input controls
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Initialize the camera (it will follow the player once set up in HubRoom)
    this.cameras.main.setBounds(0, 0, 800, 600); // Adjust dimensions as needed
  }

  update() {
    const speed = 160;
    if (this.player) {
      this.player.setVelocity(0);

      // Handle player movement based on key input
      if (this.keys.left.isDown) this.player.setVelocityX(-speed);
      if (this.keys.right.isDown) this.player.setVelocityX(speed);
      if (this.keys.up.isDown) this.player.setVelocityY(-speed);
      if (this.keys.down.isDown) this.player.setVelocityY(speed);
    }
  }
}

export default GameScene;
