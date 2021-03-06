
Background and Overview

Fitness Dash is a 2D guessing game that uses a genetic algorithm.
Objective is to guess the number of generations needed to breed a fit enough population of npcs in which 90% can 
sucessfully traverse a randomly generated map with obstacles and make it to the other side in time.

NPCs:
  -move from left side of the map to right side.
  -possible Actions: move up, move down, raise a barrier (block incoming damage from trap or projectile)
  -4 simulated raycast beams project from each npc in 4 directs, each has a collision event.
  -On colision event, NPCs choose an action based on randomization and the action's weight, as determined by their 'genes'.
  -The NPCs that are most sucessful in reaching the other side are selected and used to create the next generation of NPCs.
  
Rounds: 

  -A generation of NPCs has a limited amount of time to traverse the map and get to the other side. 
  -When the the time is up the fittest NPCs are cross-bred to produce the next generation and the cycle continues. 
  
Map:

  -The map obstacles are randomly generated vertical walls and traps 
  
  Walls:
  
    -span vertically and spaced apart
  
  Traps: 
  
    -Turret: fires projectiles that kill NPCs on hit
    -Repeller: pushes NPCs backwards
    
Objective:

  -guess correctly within a narrow margin of error the aproximate number generations needed to produce a fit population
  capable of traversing the map with a 90% success rate
  
  
Functionality & MVP

  users can:
  
  -guess on a breed generation
  -adjust population size

  -adjust the genetic algorithm:
  
    -gene mutation amount
    -gene mutation percent
    
  A modal will display the rules of the game 
  A project README will be included
  
Wireframes

The content for the game will constist of a single screen displaying the rendered map, a game controls modal, with the adjustable options referenced under Functionality and MVP. In addition, there will be an About modal, displaying the rules and linking to Github. A timer will display in the top center of the game screen. and the current generation will be displayed in the top left. A start button will prompt the player to guess a number (perhaps a min and max) before generating the first batch of NPCs. A restart button will allow the player to start over.

Technologies

-React.js for web page structure and basic features.
-HTML5 Canvas for rendering map and game objects.
-Vanilla JavaScript for game logic, including the genetic algorithm.
-Webpack.
-Howler.js for background music and sound effects.

Development Timeline

Day 1:

  -Setup the basic files/ components for rendering with react
  -Learn basics Canvas and render a game screen and basic map
  -Determine the necessary classes and methods needed to implement the game
  -create a basic outline of thhe game objects and their components
  
Day 2:

  -create the collision and logic for the game objects and implement the genetic algorithm in js.
  -determine the 'genes' that will be implemented and the starting value range / base values.
  -learn more about Canvas
  
Day 3:

  -create the sprites and basic styling of the game objects
  -setup animation
  
Day 4:

  -create controls for adjusting the algorithm and population size.
  -style the page