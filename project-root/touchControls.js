class touchControls {
    constructor(scene) {
        this.scene = scene;
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
    }

    addtouchControls() {
        const buttonSize = 80;

        // Create buttons for each direction
        this.upButton = this.scene.add.rectangle(150, window.innerHeight - 200, buttonSize, buttonSize, 0x888888).setInteractive();
        this.downButton = this.scene.add.rectangle(150, window.innerHeight - 100, buttonSize, buttonSize, 0x888888).setInteractive();
        this.leftButton = this.scene.add.rectangle(50, window.innerHeight - 150, buttonSize, buttonSize, 0x888888).setInteractive();
        this.rightButton = this.scene.add.rectangle(250, window.innerHeight - 150, buttonSize, buttonSize, 0x888888).setInteractive();

        // Make buttons semi-transparent
        this.upButton.alpha = 0.5;
        this.downButton.alpha = 0.5;
        this.leftButton.alpha = 0.5;
        this.rightButton.alpha = 0.5;

        // Add event listeners
        this.upButton.on('pointerdown', () => this.moveUp = true);
        this.upButton.on('pointerup', () => this.moveUp = false);
        this.downButton.on('pointerdown', () => this.moveDown = true);
        this.downButton.on('pointerup', () => this.moveDown = false);
        this.leftButton.on('pointerdown', () => this.moveLeft = true);
        this.leftButton.on('pointerup', () => this.moveLeft = false);
        this.rightButton.on('pointerdown', () => this.moveRight = true);
        this.rightButton.on('pointerup', () => this.moveRight = false);
    }

    updatePlayerMovement(player, speed) {
        player.setVelocity(0);

        if (this.moveLeft) player.setVelocityX(-speed);
        else if (this.moveRight) player.setVelocityX(speed);

        if (this.moveUp) player.setVelocityY(-speed);
        else if (this.moveDown) player.setVelocityY(speed);
    }
}

export default touchControls;
