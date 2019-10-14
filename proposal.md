

Overview

2d guessing game that uses genetic algorithoms.
Objective is to guess the number of generations needed to breed a fit enough population of npcs in which 90% can 
sucessfully traverse a randomly generated map with the obstacles and make it to the other side.

NPCs:
  npcs move from left side of the map to right side.
  Possible NPC Actions: move up, move down, flash barrier (block incomming damage from trap or projectile)
  4 simulated raycast beams project from each npc in 4 directs, each has a collision event.
  On colision event, NPCs chose an action based on randomization and the action's weight value.

Rounds: 
  A generation of NPCs has X amount of time t traverse the map and get to the other side. 
  When the the time is up the fittest NPCs are cross-bred to produce the next generation and the cycle continues. 
  
Map:
  the map obstacles are randomly generated vertical walls and traps 
  Walls:
    span vertically and spaced appart
  
  Traps: 
    Turret: fires projectiles that kill NPCs on hit
    Repeller: pushes NPCs backwards
    
 You Win if:
  90% population sucess AND guess is within 90% offeset of generation.

else you Lose

Functionality



Wireframes


MVPs


Development Timeline


