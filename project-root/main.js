const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#3498db',  // Blue background
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // No assets needed for this test
}

function create() {
    console.log('Game is running!');
    // You can also add some text for visual confirmation
    this.add.text(400, 300, 'Hello, Phaser!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
}

function update() {}
