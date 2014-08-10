Monsters Overlord Simulation
======

The prerequisite for this problem is as described in the bundled in instructions.md file. The remaining map at the end of the simulation is outputted to a map_end.txt file instead of the console.
Some assumptions have been made in the solution:
* all monsters move simultaneously in one round
* locations are destroyed when there are 2 or more monsters

Quick start
------

To run the simulation and tests within the repo:

1. Install node and npm, and in the root directory run:
  ```
  npm install
  ```

2. Start the simulation with N monsters:
  ```
  node game N
  ```

3. To run the tests, simply run:
  ```
  npm test
  ```

Feel free to personalise the map to run your own simulations.