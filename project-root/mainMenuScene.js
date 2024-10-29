// MainMenuScene.js

class mainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenuScene' });
    }

    preload() {
        this.load.image('MenuBackground', 'assets/MenuBackground.png');
        this.load.image('playButton', 'assets/playButton.png');
        this.load.image('settingsButton', 'assets/settingsButton.png');
        this.load.image('cursor', 'assets/cursor.png');
        this.load.audio('MenuTheme', 'assets/MenuTheme.wav');
        this.load.audio('buttonClick', 'assets/buttonClick.wav');
    }

    create() {
        console.log('Main Menu Loaded');

        // Background and music setup
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'MenuBackground');
        this.sys.game.music = this.sound.add('MenuTheme', { loop: true });
        this.sys.game.music.play();
        this.clickSound = this.sound.add('buttonClick');

        // Game title
        const titleX = 515, titleY = 100, rectWidth = 725, rectHeight = 90;
        this.add.rectangle(titleX + rectWidth / 2, titleY + rectHeight / 2, rectWidth, rectHeight, 0x000000, 0.7);
        this.add.text(titleX, titleY, 'SEVEN DEPTHS', {
            fontFamily: 'Caesar Dressing',
            fontSize: '100px',
            fill: '#B7410E'
        });

        // Play Button
        const playButton = this.add.image(this.cameras.main.centerX, 400, 'playButton')
            .setInteractive(new Phaser.Geom.Rectangle(0, 50, 300, 90), Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => {
                this.clickSound.play();
                console.log('Play button clicked');
                this.sys.game.music.stop();
                this.scene.start('GameScene');
            });
        this.add.text(this.cameras.main.centerX, 400, 'Play', { fontFamily: 'Caesar Dressing', fontSize: '32px', fill: '#FFFFFF' }).setOrigin(0.5);

        // Settings Button
        const settingsButton = this.add.image(this.cameras.main.centerX, 500, 'settingsButton')
            .setInteractive(new Phaser.Geom.Rectangle(0, 50, 300, 90), Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => {
                this.clickSound.play();
                console.log('Settings button clicked');
                this.scene.launch('SettingsScene'); // Open settings scene
                this.scene.pause(); // Pause main menu
            });
        this.add.text(this.cameras.main.centerX, 500, 'Settings', { fontFamily: 'Caesar Dressing', fontSize: '32px', fill: '#FFFFFF' }).setOrigin(0.5);

        // Custom cursor
        this.input.setDefaultCursor('none');
        this.cursor = this.add.image(0, 0, 'cursor').setOrigin(0.5);
        this.input.on('pointermove', (pointer) => {
            this.cursor.setPosition(pointer.x, pointer.y);
        });
        
    }

    update() {
        if (this.cursor) {
            this.cursor.setPosition(this.input.x, this.input.y);

        }
        
    }
}

export default mainMenuScene;
