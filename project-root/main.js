const config = {
    type: Phaser.AUTO,
    width: 1675,
    height: 825,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('MenuBackground', 'assets/MenuBackground.png');
    this.load.image('playButton', 'assets/playButton.png');
    this.load.image('settingsButton', 'assets/settingsButton.png');
    this.load.image('cursor', 'assets/cursor.png');
    this.load.audio('MenuTheme', 'assets/MenuTheme.wav');
    this.load.audio('buttonClick', 'assets/buttonClick.wav');  
}

function create() {
    console.log('Game is running!');

    // Add background image
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'MenuBackground');
    
    //background menu music
    const music = this.sound.add('MenuTheme', {loop: true});
    music.play();
    
    //button click sound
    this.clickSound = this.sound.add('buttonClick');

    // manually controlled position
    const textX = 515; // X position of the text
    const textY = 100; // Y position of the text
    
    //Black rectangle for text visability
    const rectWidth = 725;  // Adjust the width to match your text length
    const rectHeight = 90; // Adjust height based on font size
    this.add.rectangle(textX + rectWidth / 2, textY + rectHeight / 2, rectWidth, rectHeight, 0x000000, 0.7);
    //Game title text and font
    const text = this.add.text(textX, textY, 'SEVEN DEPTHS', {
        fontFamily: 'Caesar Dressing',
        fontSize: '100px', 
        fill: '#B7410E' // wethered color
    });

    //buttons positions
    const buttonX = this.cameras.main.centerX;
    const playButtonY = 400; // Y position for the Play button
    const settingsButtonY = 500; // Y position for the Settings button

    // Create Play button
    const playButton = this.add.image(buttonX, playButtonY, 'playButton')
        .setInteractive(new Phaser.Geom.Rectangle(20, 70, 300, 90), Phaser.Geom.Rectangle.Contains) // adjust dimensions as needed
        .setOrigin(0.5, 0.5);
    playButton.on('pointerdown', () => {
        this.clickSound.play({ volume: 1 });
        console.log('Play button clicked');
        // Logic to start game scene
    });

    // Create Settings button
    const settingsButton = this.add.image(buttonX, settingsButtonY, 'settingsButton')
        .setInteractive(new Phaser.Geom.Rectangle(20, 70, 300, 90), Phaser.Geom.Rectangle.Contains) // adjust dimensions as needed
        .setOrigin(0.5, 0.5);
    settingsButton.on('pointerdown', () => {
        this.clickSound.play({ volume: 1 });
        console.log('Settings button clicked');
        // Logic to move to settings scene
    });

    // Add text on top of Play button
    this.add.text(buttonX, playButtonY, 'Play', {
        fontFamily: 'Caesar Dressing',
        fontSize: '32px',
        fill: '#FFFFFF' // White color for button text
    }).setOrigin(0.5); // Center the text on the button

    // Add text on top of Settings button
    this.add.text(buttonX, settingsButtonY, 'Settings', {
        fontFamily: 'Caesar Dressing',
        fontSize: '32px',
        fill: '#FFFFFF' // White color for button text
    }).setOrigin(0.5); // Center the text on the button


    // Add cursor
    this.cursor = this.add.image(0, 0, 'cursor').setOrigin(0.5, 0.5).setVisible(true);

    
}

function update() {
    //update cursor position
    this.cursor.x = this.input.x;
    this.cursor.y = this.input.y;
}
