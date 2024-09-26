## Top down Rouge-lite Dungeon Crawler Game



## Description
My game will be a top-down dungeon crawler game where the camera will follow the player from above. It will include accessibility options to adjust brightness, audio, and music volumes. The core gameplay includes one life per dungeon dive: if the player dies, there are no revives, and they are sent back to the starting area to begin a new run. Player upgrades are not permanent-- only weapon upgrades are, using special material from fighting and defeating the final boss on floor 7. There will be no other player progression outside of weapon upgrades.


## Menu and Starting Area
- The game will feature a start menu with settings options, including volume controls for both music and in-game sounds. While brightness settings will be available as an accessibility feature, the game's visual aesthetic will be carefully maintained for each level. I am also considering including a language option for Spanish, Portuguese, other languages may be available. 

- The Starting area serves as the hub where players begin their dungeon dives and return upon an inevitible demise. A section in the area will display trinkets (buffs) collected during previous runs, any lore discovered, and the number of dungeon levels unlocked. There will also be an area where players can upgrade their weapons using materials acquired from boss battles. The game will also feature "XP" to affect environmental factors like increasing chest spawns or providing a 5% discount on shop prices. 

## Combat, Healing, and Currency: 
- Combat: The game will feature real-time, live combat. Enemies will have distinct behaviors based on their types. For example, zombies rely on close combat, while slimes mix ranged and close combat, with different attack patterns depending on their type (e.g., fire or stone). There will also be hostile plants and the classic mimic. initially, players will have acces to a sword (melee) and dagger (ranged). Upon defeating the final boss for the first time, players will unlock the crossbow (ranged) and shortsword (melee). Additionally, there will be throwable items like poison bombs and temporary player invulnerability.

- Healing/Buffs: Buffs found during runs will be temporary and specific to that session. These buffs could include gaining coins after clearing an level (e.g. 15-30 coins depending on the level), increased movement speed, or enlarged weapons for extra damage. Healing will come from food items like potatoes, apples, carrots, steak, and the rare chocolate (with varying restoration values). There will be an obsurdly rare food ite, which will be Kept secret for now.

- Currency: Gold coins and keys will be the main forms of currency. Gold is used to purchase items from the "Keeper" shopkeeper, who appears once per level, offering a random selection of three items (which could be food, buffs, or throwables). Inside the Keeper's room, there will also be a roulette box where players can trade coins or keys for guaranteed rewards, such as extra hearts. Keys will open locked doors and chests but may not always work on the first try.

## Level Design and Style
- Level Generation: Each level will follow a distinct color palette and theme, but the layout and object placements will be procedurally generated to ensure that no two levels are the same. For example, Level 1 is set closest to the surface, featuring overgrown, hostile plant life. These plants will shoot poison and manipulate the remains of adventurers who came before.(e.g. The zombies with a flower sprouting on their head). As the player progresses to deeper levels, the design and colors will evolve accordingly.

- Room Generation: Procedural generation will also apply to the rooms and hallways, using templates to randomly create the level. I plan to use Tiled Map Editor for this[1], enabling the inclusion of crates, vases, and chests, although different furniture and props will appear as players descend depper.


## Tools, Libraries, and Workspaces
- I will primarily work within GitHub Codespaces, as I find it to be a comfortable enviroment. The game will be built using the Phaser framework[1], which integrates well with useful libraries such as ROT.js[2], specifically designed for roguelike games in the browser. I was looking into using Unity for the game engine but was concerned whether all the features i was looking to use were available for free. Also since I have never worked in inuty before and found it daunting to try to learn to use a new enviroment I decided to work in GitHub Codespaces due to using it several times before and have good familiarization with it.

Here are addisional technologies i am planning to use or may explore:

- Tiled Map Editor: A tool for 2D tilemaps,  useful for creating the map and potentially the minimap[3].

- An alternative to Tiled Map Editor: LDtk (Level Designer Toolkit)[4].
It is a free and open source 2D level editer designed for creating tile maps and game levels. Its similar to Tiled but ha some other features. For example, it Supports tile-based and grid-based level design, and has several export options, including JSON, which can be integrated with many game engines (including Phaser). Multiple levels and worlds can be managed in a single project and it has more of a focus on large and complex level designs.

- Aseprite[5] or Piskel[6]: Pixel art tools for creating and animating 2D sprites. Phaser has its own capabilities, but using additional tools can provide more options for creativity

- Freesound.org: A large database of free sound effects[7].

- OpenGameArt.org: A source of free music, sound effects, and artwork[8].

- Howler.js: A JavaScript libray that integrates well with phaser for controlling sound effects and background music[9].

**Note: Some of these technologies may not be used, however they are included for reference and potential use as needed.**



## Influences and References

Here are some games that have inspired the design and mechanics of this project:

Ancient Dungeon VR: A VR dungeon crawler that serves as my main source of inspiration[10].
This title is the main inspiration behind my game. From the core gameplay and level design. The progression system stood out to me as unique since I have not encountered a game like this before where the player had no checkpoints, and no means to save the game part way through. The Concepts of my levels comes from here and the way enimies will look, attack, and sound. I plan to make my game differ in several ways but this game provides my main inspiration and backone to what my game will be.

CryptRunner: A 3D rouge-lite dungeon crawler[11].
I saw this game while browsing steam and saw many similarities to Ancient Dungeon, for example, the concept of fighting through a dungeon, and the presence of a shopkeeper withing the dungeon. Just like evey other rouge-like game there are close and long ranged enemies. However, it wasnt a vr title. It was a blend of 3D and 2D. It had a camera behind the player, and had a 3D enviroment where you can see the depth of the walls and corridors. However it still used traditional sprites where they would always turn to face the camera and were 2D.. You could only see the front or back of each sprite. I Mainly liked this game for its color schemes and sprites. Taking inspiration from them in how I could blend different colors and shapes to make more appealing sprites. 

Slay the Spire: A rougelike deck-builder[12].
This game is a deck builder type where you have turn based battles. I want to avoid this concept but I liked the way the sprites were animated and wanted to use them as reference. The game from what i saw doesnt have much free movement and seems for forgiving in terms of combat and progression. This games sprites were more human and fluid. I want to maintain the pixel or voxel look. Where you can visible see each and every pixel of color.

The Binding of Issac: A classic rouge-like dungeon crawler[13]. This game is similar in regards to level design and combat. the game also follows the concept of finding power ups, live combat and some style similarities. Crypt Runner is similar in this way also. It feature many of the same concepts as what I want my game to achieve. However, my goal just like the games im taking inspiration from is to give it my own unique style and make it feel fresh.



## Technology References: Main website or technology location

[1] Photon Storm, Phaser. [Online]. Available: https://phaser.io/. [Accessed: Sept. 10, 2024].

[2] Ondřej Žára, ROT.js. [Online]. Available: https://ondras.github.io/rot.js/. [Accessed: Sept. 10, 2024].

[3] Thorbjørn Lindeijer, Tiled Map Editor. [Online]. Available: https://www.mapeditor.org/. [Accessed: Sept. 10, 2024].

[4] Sébastien Bénard, LDtk - Level Designer Toolkit. [Online]. Available: https://ldtk.io/. [Accessed: Sept. 10, 2024].

[5] David Capello, Aseprite. [Online]. Available: https://www.aseprite.org/. [Accessed: Sept. 10, 2024].

[6] Piskel, Piskel. [Online]. Available: https://www.piskelapp.com/. [Accessed: Sept. 10, 2024].

[7] Freesound, Freesound.org. [Online]. Available: https://freesound.org/. [Accessed: Sept. 10, 2024].

[8] OpenGameArt, OpenGameArt.org. [Online]. Available: https://opengameart.org/. [Accessed: Sept. 10, 2024].

[9] James Simpson, Howler.js. [Online]. Available: https://howlerjs.com/. [Accessed: Sept. 10, 2024].

## Game References: Steam Download Pages

[10] Eric Thullen, Ancient Dungeon. [Online]. Available:https://store.steampowered.com/app/1125240/Ancient_Dungeon/ [Published: Nov 3, 2021]

[11] Crunchy Leaf Games, Cryptrunner. [Online]. Available: https://store.steampowered.com/app/1030410/Cryptrunner/. [Published: Apr. 18, 2019].

[12] MegaCrit, Slay the Spire. [Online]. Available: https://store.steampowered.com/app/646570/Slay_the_Spire/. [Published: Jan. 23, 2019].

[13] Edmund McMillen, The Binding of Isaac: Rebirth. [Online]. Available: https://store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/. [Published: Nov. 4, 2014].