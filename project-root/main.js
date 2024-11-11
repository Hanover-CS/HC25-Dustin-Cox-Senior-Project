
// main.js

import mainMenuScene from './mainMenuScene.js';
import SettingsScene from './SettingsScene.js';
import GameScene from './GameScene.js';
import HubRoom from './HubRoom.js';
import Room from './Room.js';
import RegularRoom from './RegularRoom.js';


const config = {
    type: Phaser.AUTO,
    width: 1675,
    height: 825,
    physics: {
        default: 'arcade', // Enable arcade physics for easy movement
        arcade: {
            debug: false
        }
    },
    scene: [RegularRoom, Room, HubRoom, mainMenuScene, SettingsScene, GameScene],
    audio: {
        disableWebAudio: false
    }
};

const game = new Phaser.Game(config);
export default game;
