/*jshint indent: 2*/
'use strict';

var Utility = require('./lib/utility');
var Locations = require('./lib/locations');
var Monsters = require('./lib/monsters');

var monstersCount = process.argv[2];

// synchronously read contents of map.txt to build locations object with nearby information
var locations = Locations.create('map.txt');

// create monsters at random locations with temporary names
var monsters = Monsters.create(monstersCount, locations);

// fight monsters at same location
Monsters.fight(monsters, locations);

var round = 0;
while (round < 10000 && Object.keys(monsters).length) {
  // move each monster and fight monsters
  Monsters.move(monsters, locations);
  Monsters.fight(monsters, locations);
  round++;
}

Utility.output('map_end.txt', Locations.log(locations));