// RegularRoom.js


class RegularRoom extends Phaser.Scene {
    constructor(roomKey) {
        super({ key: roomKey });
        this.roomKey = roomKey; // Store the room type for easy reference
    }

    create() {
        this.createRoom();
    }

    createRoom() {
        const roomWidth = 800;
        const roomHeight = 600;

        this.add.image(0, 0, 'floor').setDisplaySize(roomWidth, roomHeight).setOrigin(0, 0);
        // Add walls as necessary...
        
        // Create doorways
        this.createDoorways(roomWidth, roomHeight);
    }

    createDoorways(roomWidth, roomHeight) {
        this.doorTop = this.physics.add.rectangle(roomWidth / 2, 0, 50, 10, 0xffffff).setOrigin(0.5, 0);
        this.doorBottom = this.physics.add.rectangle(roomWidth / 2, roomHeight, 50, 10, 0xffffff).setOrigin(0.5, 1);
        this.doorLeft = this.physics.add.rectangle(0, roomHeight / 2, 10, 50, 0xffffff).setOrigin(0, 0.5);
        this.doorRight = this.physics.add.rectangle(roomWidth, roomHeight / 2, 10, 50, 0xffffff).setOrigin(1, 0.5);

        // Set immovable
        this.doorTop.setImmovable(true);
        this.doorBottom.setImmovable(true);
        this.doorLeft.setImmovable(true);
        this.doorRight.setImmovable(true);

        // Set up collision detection with the player
        this.physics.add.overlap(this.player, this.doorTop, () => this.scene.start('BossRoom'));
        this.physics.add.overlap(this.player, this.doorBottom, () => this.scene.start('RegularRoom3'));
        this.physics.add.overlap(this.player, this.doorLeft, () => this.scene.start('ShopRoom'));
        this.physics.add.overlap(this.player, this.doorRight, () => this.scene.start('RegularRoom4'));
    }
}

export default RegularRoom;
