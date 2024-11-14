// RoomManager.js
//The place that handles the room transitions and door generation.
import RegularRoom from './RegularRoom.js';
import HubRoom from './HubRoom.js';
import Room from './Room';
import ShopRoom from './ShopRoom.js';
import BossRoom from './BossRoom.js';

class RoomManager {
    constructor(scene) {
        this.scene = scene;
        this.rooms = [];
        this.currentRoom = null;
    }

    createInitialRooms() {
        // Create the hub room
        const hubRoom = new HubRoom(this.scene, this.scene.cameras.main.centerX, this.scene.cameras.main.centerY);
        this.rooms.push(hubRoom);
        this.currentRoom = hubRoom;

        // Create additional regular rooms
        for (let i = 0; i < 5; i++) {
            const x = this.scene.cameras.main.centerX + (i * 900); // Adjust position for regular rooms
            const regularRoom = new RegularRoom(this.scene, x, this.scene.cameras.main.centerY);
            this.rooms.push(regularRoom);
        }
    }

    enterNextRoom() {
        // Logic to enter the next room
        // Hide the current room and show the next
    }
}

export default RoomManager;
