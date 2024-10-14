# Prerequisites

## Required Knowledge

Before starting this tutorial, you should have a basic understanding of:

- **Basic understanding of Phaser**: You should already know how to set up a simple Phaser project, including creating a scene and adding basic game objects. If you're new to Phaser, you can follow the [Phaser setup guide](https://phaser.io/tutorials/making-your-first-phaser-3-game) before proceeding.
- **JavaScript ES6 syntax**: This tutorial uses modern JavaScript syntax such as `const`, `let`, arrow functions (`=>`), and modules. You should be comfortable with these basics before continuing.


## Required Tools and Software

To follow along with this tutorial, make sure you have the following tools installed:

1. **Node.js** and **npm**: Node.js is used to run a local development server, and npm is used to install Phaser and other dependencies.

   - You can download Node.js from [here](https://nodejs.org/).
   - After installing Node.js, verify it by running the following commands in your terminal:

     ```bash
     node -v
     npm -v
     ```

2. **GitHub Codespaces**: We will use GitHub Codespaces as the main IDE for this tutorial. A GitHub account is required.

   - If you don't have a GitHub account, you can sign up for one [here](https://github.com/join).
   - Set up GitHub Codespaces by visiting the repository for your project and clicking the **Codespaces** tab.

3. **Phaser.js**: Phaser.js is the game development framework that we will use to create the dungeon crawler.

   - We will install Phaser.js during the setup steps.

## Environment Setup

1. **Clone your project repository from GitHub**:

   ```bash
   git clone https://github.com/your-username/your-game-project.git


2. **Open the project in GitHub Codespaces**:
    - Go to your repository on GitHub.

    - Click on the code button and select Open in Codespaces.

3. **Install dependencies**:
    - Inside the Codespace, run the following command in the terminal to install Phaser and other necessary libraries:

    - npm install phaser

### Game Setup
    - Make sure you have a basic Phaser project already running with at least one scene. Your scene could be as simple as a blue background with the text "Hello, Phaser!" displayed.

   - Here is an example of a simple Phaser scene to test if everything is set up correctly:

   const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
}

function create() {
    this.add.image(400, 300, 'sky');
    this.add.text(250, 300, 'Hello, Phaser!', { fontSize: '32px', fill: '#fff' });
}

- it the above code uns successfully, you are ready to proceed with the tutorial?