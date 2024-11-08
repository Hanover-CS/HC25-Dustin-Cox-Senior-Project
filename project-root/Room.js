// Room.js
class Room {
    constructor(scene, width, height, x, y, roomType) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.roomType = roomType;

        this.createRoom();
    }

    createRoom() {
        this.floor = this.scene.add.image(this.x, this.y, 'floor').setDisplaySize(this.width, this.height);
        this.walls = this.scene.physics.add.staticGroup();
        this.addWalls();
    }

    addWalls() {
        const wallThickness = 20;

        // Add walls to the room
        this.addWall(this.x - this.width / 2, this.y, this.width, wallThickness * 2); // Top
        this.addWall(this.x + this.width / 2, this.y, this.width, wallThickness * 2); // Bottom
        this.addWall(this.x, this.y - this.height / 2, wallThickness * 2, this.height); // Left
        this.addWall(this.x, this.y + this.height / 2, wallThickness * 2, this.height); // Right
    }

    addWall(x, y, width, height) {
        const wall = this.scene.add.tileSprite(x, y, width, height, 'wall');
        this.walls.add(wall);
    }

    // Method to add a doorway
    addDoorway(doorX, doorY) {
        const doorWidth = 50, doorHeight = 50;
        const doorway = this.scene.add.rectangle(doorX, doorY, doorWidth, doorHeight, 0x000000);
        doorway.setInteractive();
        return doorway;
    }
}

export default Room;
