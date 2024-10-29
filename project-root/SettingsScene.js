// SettingsScene.js


class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    preload() {
        //cursor image and setting panel
        this.load.image('cursor', 'assets/cursor.png');
        this.load.image('settingsPanel', 'assets/settingsPanel.png');
    }

    create() {
        // Hide the default cursor
        this.input.setDefaultCursor('none');
        this.cursor = this.add.image(0, 0, 'cursor').setOrigin(0.5, 0.5).setVisible(true);

        // Add a solid background panel image
        const panel = this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'settingsPanel'
        ).setOrigin(0.5).setScale(1.5); // Adjust scale if needed

        //const titleRect = this.add.rectangle(
            //this.cameras.main.centerX, 250, 300, 50, 0x000000, 0.7);


        // Title for the settings menu
        this.add.text(this.cameras.main.centerX, 220, 'Settings', {
            fontSize: '32px',
            color: '#000000',
            fontFamily: 'Arial',
        }).setOrigin(0.5);

        //volume label
        this.add.text(this.cameras.main.centerX, 320, 'Volume', {
            fontSize: '24px',
            color: '#000000',
            fontFamily: 'Arial',
        }).setOrigin(0.5);
        

        // Draw the slider track
        const trackX = this.cameras.main.centerX - 100;
        const trackY = 360;
        const trackWidth = 200;

        const sliderRect = this.add.rectangle(
            this.cameras.main.centerX, trackY, // Centered X, Y aligned with slider
            220, 40, // Rectangle slightly larger than slider width and height
            0x000000, 0.7
        );

        const sliderTrack = this.add.graphics();
        sliderTrack.lineStyle(4, 0xffffff, 1);
        sliderTrack.strokeRect(trackX, trackY, trackWidth, 4);

        // Slider thumb
        const sliderThumb = this.add.circle(trackX, trackY, 10, 0xff0000);

        // Update thumb position based on current volume
        const initialVolume = this.sys.game.music.volume;
        sliderThumb.x = trackX + trackWidth * initialVolume;

        // Listen for pointer movement to control volume slider
        this.input.on('pointermove', (pointer) => {
            // Check if pointer is within slider range
            if (
                pointer.x >= trackX &&
                pointer.x <= trackX + trackWidth &&
                Math.abs(pointer.y - trackY) < 20 // Small vertical range to avoid accidental changes
            ) {
                // Move thumb to cursor position
                sliderThumb.x = pointer.x;

                // Calculate volume based on thumb position
                const volume = (sliderThumb.x - trackX) / trackWidth;
                this.sys.game.music.setVolume(volume);
            }

            // Update custom cursor position
            this.cursor.setPosition(pointer.x, pointer.y);
        });

        // Custom cursor image
        this.cursor = this.add.image(0, 0, 'cursor').setOrigin(0.5).setVisible(true);

        // Close button with black rectangle background for visibility
        const closeButtonRect = this.add.rectangle(
            this.cameras.main.centerX, 600, 
            100, 40,
            0x000000, 0.7
        );

        const closeButton = this.add.text(this.cameras.main.centerX, 600, 'Close', {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'Arial',
        }).setOrigin(0.5).setInteractive();

        closeButton.on('pointerdown', () => {
            this.scene.stop('SettingsScene');
            this.scene.resume('mainMenuScene'); // Ensure your main menu scene key matches
        });
    }
}

export default SettingsScene;
