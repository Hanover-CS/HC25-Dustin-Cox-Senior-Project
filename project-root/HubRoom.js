// HubRoom.js
// The main home of the player, this is where the player starts and returns to
// where the player will be able to eventually see what they have collected and upgrade their weapon

class HubRoom extends Phaser.Scene {
  constructor() {
    super({ key: "HubRoom" });
  }
  
  init(data) {
    //references to game scene and room manager
    this.gameScene = data.gameScene;
    this.roomManager = data.roomManager;
  }

  preload() {
    // Preload assets for the room
    this.load.image("floor", "assets/floor.png");
    this.load.image("wall", "assets/wall.jpg");
    this.load.image("player", "assets/placeHolder.png");
    this.load.image("box", "assets/box.png");
    this.load.image("rocks", "assets/rocks.png");
    this.load.image("counter", "assets/counter.png");
    this.load.image("barrel", "assets/barrel.png");
    this.load.image("blacksmith", "assets/blacksmith.png");
    this.load.image("anvil", "assets/anvil.png");

    // Preload background music
    this.load.audio("GameMusic", "assets/GameMusic.wav");
  }

  create() {
    // Start background music when the HubRoom scene is created and on loop
    this.backgroundMusic = this.sound.add("GameMusic", { loop: true, volume: 0.5 });
    this.backgroundMusic.play();

    const worldWidth = 5000; // Overall world width for free movement and expansion
    const worldHeight = 5000; // Overall world height
    const roomWidth = 1000; // Room dimensions
    const roomHeight = 1000;

    // Set the physics world bounds to the large world size
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // configure camera bounds and zoom level
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight); // Large world space
    this.cameras.main.setZoom(0.5); // Adjust zoom to see more of the world

    // center of the room definition
    const roomCenterX = worldWidth / 2;
    const roomCenterY = worldHeight / 2;

    // Create the player at the given position (by default, at the center of HubRoom)
    this.player = this.physics.add.sprite(roomCenterX, roomCenterY, "player");
    this.player.setCollideWorldBounds(false); 

    // Set the player's depth to appear on top of the floor
    this.player.setDepth(1);

    // Camera follows the player and centers on them
    this.cameras.main.startFollow(this.player);
    this.cameras.main.centerOn(roomCenterX, roomCenterY); // Center on the room

    // Add keyboard controls for player movement
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interact: Phaser.Input.Keyboard.KeyCodes.E // 'E' key for interaction
    });

    // Call function to create the room layout
    this.createRoom(roomCenterX, roomCenterY, roomWidth, roomHeight);

    // Set up collisions with walls
    this.physics.add.collider(this.player, this.walls); // Make player collide with walls

    // Create doorways for transitions (only right door for HubRoom)
    this.createDoorways(worldWidth / 2, worldHeight / 2, roomWidth, roomHeight);

    // Initialize the conversation with npc
    this.conversationStep = 0;
    this.conversationTexts = [
      "pst! pst! In here!",
      "Im in here. In the barrel. Don't worry I ain't no monster or weirdo",
      "I am just a simple man hiding in here in this finely crafted dwarven beer barrel.",
      "It's my safe space in case any of the monsters come around! no evil plant or skeleton getting me in here!",
      "Anyway, you were out cold for awhile after you fell in here. You sure you alright? We dont have any healers or doctors down here.",
      "If you need any potions we have a few available for free, but the high grade stuff will cost you",
      "Anyway, introductions are in order, Names Winston, Nice to meet'cha! I used to be a merchant befor falling in here.",
      "What should I call you? What were you before you had the misfortune of falling in?",
      "...",
      "I get it, your one of those strong silent types. I can tell by the sword on your back",
      "Well, I used to sell spice, now I just sit idle in this barrel and trade food with those who brave the Dungeon.",
      "Anyway, If you happen to come across some precious materials called oricalcum make sure to bring it to Brackus!",
      "He is our resident blacksmith, he will make your swords and daggers shaper than Obsidian and Sturdier than Steel!",
      "Also, is you find some notes from those who perished in the dungeon bring them to me. I've taken to collecting them",
      "So that if we manage to find a way out of here I can return them to their families. They deserve closure."
    ];

    // Create a text bubble for converstation (initially hidden)
    this.textBubble = this.add.text(roomCenterX, roomCenterY - 60, "", {
      fontSize: '22px',
      fill: '#fff',
      backgroundColor: '#000',
      padding: { x: 10, y: 10 },
      wordWrap: { width: 200, useAdvancedWrap: true }
    }).setOrigin(0.5).setAlpha(0).setDepth(10); // Set higher depth for visibility

    // Define the interaction range
    this.interactionRange = 350;
  }

  createRoom(centerX, centerY, roomWidth, roomHeight) {
    console.log("Room is created");

    // Add floor centered in the room
    this.add
      .image(centerX, centerY, "floor")
      .setDisplaySize(roomWidth, roomHeight)
      .setOrigin(0.5)
      .setDepth(0);

    // Create walls as a static group for physics collision
    this.walls = this.physics.add.staticGroup();
    const wallTileSize = 40;

    // Add left and right walls (tiled vertically)
    for (
      let y = centerY - roomHeight / 2;
      y <= centerY + roomHeight / 2;
      y += wallTileSize
    ) {
      this.walls
        .create(centerX - roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(1, 0.5)
        .setDepth(0)
        .refreshBody();
      this.walls
        .create(centerX + roomWidth / 2, y, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setSize(wallTileSize, wallTileSize)
        .setOrigin(0, 0.5)
        .setDepth(0)
        .refreshBody();
    }

    // Add top and bottom walls (tiled horizontally)
    for (
      let x = centerX - roomWidth / 2;
      x <= centerX + roomWidth / 2;
      x += wallTileSize
    ) {
      this.walls
        .create(x, centerY - roomHeight / 2, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setOrigin(0.5, 1)
        .setDepth(0)
        .refreshBody();
      this.walls
        .create(x, centerY + roomHeight / 2, "wall")
        .setDisplaySize(wallTileSize, wallTileSize)
        .setOrigin(0.5, 0)
        .setDepth(0)
        .refreshBody();
    }
    //add second npc and anvil with collision
    const assetSize = 50;
    const assetOffsetX = -roomWidth / 2 + assetSize + 20; // Shift left
    const assetOffsetY = -roomHeight / 2 + assetSize + 20; // Shift up
    this.assets = this.physics.add.staticGroup();
    this.assets.create(centerX + assetOffsetX, centerY + assetOffsetY, "blacksmith").setDisplaySize(assetSize, assetSize).refreshBody();
    this.assets.create(centerX + assetOffsetX + 60, centerY + assetOffsetY, "anvil").setDisplaySize(assetSize, assetSize).refreshBody();

    this.physics.add.collider(this.player, this.assets);
    
    // Small boxes in corner with conversation npc
    const boxSize = 30;
    const boxOffsetX = roomWidth / 2 - boxSize - 0; 
    const boxOffsetY = -roomHeight / 2 + boxSize + 40; 
    this.boxes = this.physics.add.staticGroup();

    const rows = 3;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        this.boxes.create(
          centerX + boxOffsetX - col * boxSize,
          centerY + boxOffsetY - row * boxSize,
          "box"
        ).setDisplaySize(boxSize, boxSize)
          .setDepth(1)
          .refreshBody();
      }
    }
    //created the counter seperating player and npc
    const counterSize = 50;
    const counterSpacing = 150;
    this.counters = this.physics.add.staticGroup();

    const counterStartX = centerX + roomWidth / 2 - counterSpacing;
    const counterStartY = centerY - roomHeight / 2 + 30;

    for (let j = 0; j < 4; j++) {
      this.counters.create(
        counterStartX,
        counterStartY + j * counterSize,
        "counter"
      ).setDisplaySize(counterSize, counterSize)
        .refreshBody();
    }

    for (let i = 1; i < 4; i++) {
      this.counters.create(
        counterStartX + i * counterSize,
        counterStartY + 3 * counterSize,
        "counter"
      ).setDisplaySize(counterSize, counterSize)
        .refreshBody();
    }

    // Add collisions between the player and these objects
    this.physics.add.collider(this.player, this.boxes);
    this.physics.add.collider(this.player, this.counters);

    // Add the barrel behind the counter(npc)
    const barrelSize = 50;
    const barrelX = centerX + roomWidth / 2 - barrelSize / 2 - 60; 
    const barrelY = centerY - roomHeight / 2 + barrelSize / 2 + 80; 

    this.barrel = this.add.image(barrelX, barrelY, "barrel")
        .setDisplaySize(barrelSize, barrelSize)
        .setDepth(0);


    
  }
  
  createDoorways(centerX, centerY, roomWidth, roomHeight) {
    this.doorRight = this.add
      .rectangle(centerX + roomWidth / 2 - 20, centerY, 20, 50, 0x00ff00)
      .setOrigin(0.5, 0.5)
      .setDepth(0);
    this.physics.add.existing(this.doorRight, true); 

    this.physics.add.overlap(
      this.player,
      this.doorRight,
      () => {
        console.log("Player is transitioning to the next room...");
        if (this.roomManager) {
          this.roomManager.handleTransition(this.player, "right");
        } else {
          console.error("RoomManager is not defined!");
        }
      },
      null,
      this
    );
  }

  update() {
    const speed = 160;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }

    // Check if player is near the barrel and 'E' key is pressed
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.barrel.x, this.barrel.y);
    
    if (distance < this.interactionRange) {
      // Show the text bubble when within interaction range
      this.textBubble.setPosition(this.barrel.x + 100, this.barrel.y - 90); // Adjust position freely
      this.textBubble.setAlpha(1);

      // Listen for a single press-and-release of 'E' to progress conversation
      if (Phaser.Input.Keyboard.JustUp(this.cursors.interact)) {
          if (this.conversationStep < this.conversationTexts.length) {
              // Display the next line of the conversation
              this.textBubble.setText(this.conversationTexts[this.conversationStep]);
              this.conversationStep++;
          } else {
              // End of conversation: Hide the bubble
              this.textBubble.setAlpha(0);
              this.conversationStep = 0;
          }
      }
  } else {
      // Hide the text bubble when outside the interaction range
      this.textBubble.setAlpha(0);
      this.conversationStep = 0;
    }
  }
}

export default HubRoom;
