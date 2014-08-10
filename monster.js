/*jshint indent: 2*/
'use strict';

var fs = require('fs');

var monsterCount = process.argv[2];

var randomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// synchronously read contents of map.txt to build locations object with nearby information
var mapString = fs.readFileSync('map.txt', 'utf8');
var locationsArray = mapString.split('\n');
locationsArray.pop();
var locations = {};
for (var i=0; i<locationsArray.length; i++) {
  var locationLinks = locationsArray[i].split(/[ =]/);
  var individualLocation = locations[locationLinks[0]] = {};
  for (var j=1; j<locationLinks.length; j+=2) {
    individualLocation[locationLinks[j]] = locationLinks[j+1];
  }
}

// create monsters at random locations with temporary names
var monsters = {};
for (var i=1; i<=monsterCount; i++) {
  monsters[i] = {};
  var locationNames = Object.keys(locations);
  monsters[i].location = randomValue(locationNames);
}

// move each monster
for (var monster in monsters) {
  var oldLocation = monsters[monster].location;
  // find random path and update monster's location
  var directions = Object.keys(locations[oldLocation]);
  var randomDirection = randomValue(directions);
  if (randomDirection) {
    monsters[monster].location = locations[oldLocation][randomDirection];
  } else {
    monsters[monster].location = oldLocation;
  }
}

// check if any monsters are at the same location
var tempLocations = {};
for (var monster in monsters) {
  var tempLocation = monsters[monster].location;
  var tempMonsters = tempLocations[tempLocation];
  if (tempMonsters) {
    tempMonsters.push(monster);
  } else {
    tempMonsters = [monster];
  }
}
// destroy relevant monsters, cities and paths
for (tempLocation in tempLocations) {
  var tempMonsters = tempLocations[tempLocation];
  if (tempMonsters.length > 1) {
    var logger = tempLocation + ' has been destroyed by ';
    for (var i=0; i<tempMonsters.length; i++) {
      delete monsters[tempMonsters[i]];
      if (i !== tempMonsters.length-1) {
        logger += 'monster ' + tempMonsters[i] + ', ';
      } else {
        logger += 'and monster ' + tempMonsters[i];
      }
    }
    for (var tempLocationCheck in locations) {
      for (var direction in locations[tempLocationCheck]) {
        if (tempLocation === locations[tempLocationCheck][direction]) {
          delete locations[tempLocationCheck][direction];
        }
      }
    }
    delete locations[tempLocation];
    console.log(logger);
  }
}