// main.js
// The main file that sets up the game and its contents

import mainMenuScene from "./mainMenuScene.js";
import SettingsScene from "./SettingsScene.js";
import GameScene from "./GameScene.js";
import HubRoom from "./HubRoom.js";
import Room from "./Room.js";
import RegularRoom from "./RegularRoom.js";
import ShopRoom from "./ShopRoom.js";
import BossRoom from "./BossRoom.js";
import RoomManager from "./RoomManager.js";

const config = {
  type: Phaser.AUTO,
  width: 1675,
  height: 825,
  physics: {
    default: "arcade", // Enable arcade physics for easy movement
    arcade: {
      debug: false,
    },
  },
  scene: [
    mainMenuScene,
    SettingsScene,
    GameScene,
    HubRoom,
    RegularRoom,
    Room,
    ShopRoom,
    BossRoom,
  ],
  audio: {
    disableWebAudio: false,
  },
};

const game = new Phaser.Game(config);
export default game;
