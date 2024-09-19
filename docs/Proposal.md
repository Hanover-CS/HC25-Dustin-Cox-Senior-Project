## Top down Rougue lite Dungeon Crawler Game



## Description
My game will be a top-down dungeon crawler game where the camera will follow the player from above. It will include accessibility options to adjust brightness, audio, and music volumes. The core gameplay includes one life per dungeon dive: if the player dies, there are no revives, and they are sent back to the starting area to begin a new run. Player upgrades are not permanent-- only weapon upgrades are, using special material from fighting and defeating the final boss on floor 7. There will be no other player progression outside of weapon upgrades.


## Menu and Starting Area
- The game will feature a start menu with settings options, including volume controls for both music and in-game sounds. While brightness settings will be available as an accessibility feature, the game's visual aesthetic will be carefully maintained for each level. I am also considering including a language option for Spanish, Portuguese, other languages may be available. 

- The Starting area serves as the hub where players begin their dungeon dives and return upon an inevitible demise. A section in the area will display trinkets (buffs) collected during previous runs, any lore discovered, and the number of dungeon levels unlocked. There will also be an area where players can upgrade their weapons using materials acquired from boss battles. The game will also feature "XP" to affect environmental factors like increasing chest spawns or providing a 5% discount on shop prices. 

## Combat, Healing, and Currency: 
- Combat: The game will feature real-time, live combat. Enimies will have distinct behaviors based on their types. For example, zombies rely on close combat, while slimes mix ranged and close combat, with different attack patterns depending on their type (e.g., fire or stone). There will also be hostile plants and the classic mimic. initially, players will have acces to a sword (melee) and dagger (ranged). Upon defeating the final boss for the first time, players will unlock the crossbow (ranged) and shortsword (melee). Additionally, there will be throwable items like poison bombs and temporary player invulnerability.

- Healing/Buffs: Buffs found during runs will be temporary and specific to that session. These buffs could include gaining coins after clearing an level (e.g. 15-30 coins depending on the level), increased movement speed, or enlarged weapons for extra damage. Healing will come from food items like potatoes, apples, carrots, steak, and the rare chocolate (with varying restoration values). There will be an obsurdly rare food ite, which will be Kept secret for now.

- Currency: Gold coins and keys will be the main forms of currency. Gold is used to purchase items from the "Keeper" shopkeeper, who appears once per level, offering a random selection of three items (which could be food, buffs, or throwables). Inside the Keeper's room, there will also be a roulette box where players can trade coins or keys for guaranteed rewards, such as extra hearts. Keys will open locked doors and chests but may not always work on the first try.

## Level Design and Style
- Level Generation: Each level will follow a distinct color palette and theme, but the layout and object placements will be procedurally generated to ensure that no two levels are the same. For example, Level 1 is set closest to the surface, featuring overgrown, hostile plant life. These plants will shoot poison and manipulate the remains of adventurers who came before.(e.g. The zombies with a flower sprouting on their head). As the player progresses to deeper levels, the design and colors will evolve accordingly.

- Room Generation: Procedural generation will also apply to the rooms and hallways, using templates to randomly create the level. I plan to use Tiled Map Editor for this[1], enabling the inclusion of crates, vases, and chests, although different furniture and props will appear as players descend depper.


## Tools, Libraries, and Workspaces
- I will primarily work within GitHub Codespaces, as I find it to be a comfortable enviroment. The game will be built using the Phaser framework[1], which integrates well with useful libraries such as ROT.js[2], specifically designed for roguelike games in the browser.

Here are addisional technologies i am planning to use or may explore:

- Tiled Map Editor: A tool for 2D tilemaps,  useful for creating the map and potentially the minimap[3].

- Aseprite[4] or Piskel[5]: Pixel art tools for creating and animating 2D sprites. Phaser has its own capabilities, but using additional tools can provide more options for creativity

- Freesound.org: A large database of free sound effects[6].

- OpenGameArt.org: A source of free music, sound effects, and artwork[7].

- Howler.js: A JavaScript libray that integrates well with phaser for controlling sound effects and background music[8].

**Note: Some of these technologies may not be used, however they are included for reference and potential use as needed.**



## Influences and References

Here are some games that have inspired the design and mechanics of this project:

Ancient Dungeon VR: A VR dungeon crawler that serves as my main source of inspiration[9].

CryptRunner: A 3D rouge-lite dungeon crawler[10].

Slay the Spire: A rougelike deck-builder[11].

The Binding of Issac: A classic rougelike dungeon crawler[12].




## Game References: Steam Download Pages

[9] https://store.steampowered.com/app/1125240/Ancient_Dungeon/

[10] https://store.steampowered.com/app/1030410/Cryptrunner/\

[11] https://store.steampowered.com/app/646570/Slay_the_Spire/

[12] https://store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/


## Technology References: Main website or technology location

[1] https://phaser.io/

[2] https://github.com/ondras/rot.js/

[3] https://www.mapeditor.org/

[4] https://www.aseprite.org/

[5] https://www.piskelapp.com/

[6] https://freesound.org/

[7] https://opengameart.org/

[8] https://howlerjs.com/