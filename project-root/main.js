
// main.js

import mainMenuScene from './mainMenuScene.js';
import SettingsScene from './SettingsScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1675,
    height: 825,
    scene: [mainMenuScene, SettingsScene],
    audio: {
        disableWebAudio: false
    }
};

const game = new Phaser.Game(config);
export default game;
