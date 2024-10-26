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

    
}

function update() {}
