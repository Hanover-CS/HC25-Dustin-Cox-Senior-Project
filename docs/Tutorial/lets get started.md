# Getting Started
- At this point you should have already created a simple phaser game or scene. Here's a quick reminder of what that might look like:

// basic setup
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload() {
    this.add.text(100, 100, 'Hi Phaser!', { font: '32px Arial', fill: '#ffffff' });
}

function create() {
    // Basic blue background
    this.cameras.main.setBackgroundColor('#3498db');
}

function update() {}

## Include Howler.js
- If you are using a local enviroment, link Howler.js via CDN in your index.html file:

- <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"></script>

- Alternatively, if you're using NPM, ensure you have installed Howler.js by running:

 - npm install howler

### Adding background Music

 - First, let's add some background music that loops throughout the game.

- In your create function, you can instantiate a Howler sound object like this:

function create() {
    // Set a blue background
    this.cameras.main.setBackgroundColor('#3498db');
    
    // Initialize background music using Howler.js
    var backgroundMusic = new Howl({
        src: ['assets/audio/background-music.mp3'], // make sure this path is correct
        autoplay: true,
        loop: true,
        volume: 0.5, // set the volume to 50%
    });

    backgroundMusic.play();
}

#### Adding Sound Effects

- Now, let’s add a sound effect that plays when a specific action occurs. For this example, let’s play a sound effect when the player clicks anywhere on the screen.

- Update your create function to add a click event listener that plays the sound:

function create() {
    this.cameras.main.setBackgroundColor('#3498db');

    // Background music
    var backgroundMusic = new Howl({
        src: ['assets/audio/background-music.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5,
    });

    backgroundMusic.play();

    // Add click sound effect
    var clickSound = new Howl({
        src: ['assets/audio/click.mp3'], // ensure this path is correct
        volume: 1.0
    });

    // Play the sound effect when the player clicks
    this.input.on('pointerdown', function () {
        clickSound.play();
    });
}

##### Controlling Audio
- Let's add some audio control functionality for muting and unmuting music. We’ll bind this to pressing the M key on the keyboard.

function create() {
    this.cameras.main.setBackgroundColor('#3498db');

    var backgroundMusic = new Howl({
        src: ['assets/audio/background-music.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5,
    });

    backgroundMusic.play();

    var isMuted = false;

    // Toggle mute on keypress
    this.input.keyboard.on('keydown-M', function () {
        isMuted = !isMuted;
        Howler.mute(isMuted); // mute or unmute all sounds
    });
}

###### Practice Exercises

- Exercise 1: Play Different Sounds for Different Events

- Add another sound effect (e.g., a jump or attack sound) that plays when the player presses a specific key (like the spacebar).

- Example:
 this.input.keyboard.on('keydown-SPACE', function () {
    // Play a jump sound
});

- Exercise 2: Control Volume Dynamically

- Modify the tutorial code so that pressing the + or - key increases or decreases the background music volume dynamically.

####### See also:
- Phaser Audio Docs: To understand Phaser’s built-in audio capabilities.

- Howler.js Documentation: Detailed docs on the features of Howler.js.

- Basic Phaser Setup: In case you need help with setting up Phaser.