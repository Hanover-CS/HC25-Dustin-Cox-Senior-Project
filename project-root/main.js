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
}

function create() {
    console.log('Game is running!');
    
    // Add background image
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'MenuBackground');
    
    // Position the text at the center of the top (horizontally centered, but close to the top)
    const textY = 50;  // Position near the top of the screen
    this.add.text(this.cameras.main.centerX, textY, 'Hello, Phaser!', { 
        fontSize: '32px', 
        fill: '#fff' 
    }).setOrigin(0.5, 0);  // Center horizontally, but align vertically at the top
}

function update() {}
