/*jshint indent: 2*/
'use strict';

var fs = require('fs');

var randomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createLocations = function (mapFile) {
  var mapString = fs.readFileSync(mapFile, 'utf8');
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
  return locations;
};

var createMonsters = function (monstersCount, locations) {
  var monsters = {};
  for (var i=1; i<=monstersCount; i++) {
    monsters[i] = {};
    var locationNames = Object.keys(locations);
    monsters[i].location = randomValue(locationNames);
  }
  return monsters;
};

var moveMonsters = function (monsters, locations) {
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
};

var fightMonsters = function (monsters, locations) {
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
  for (var tempLocation2 in tempLocations) {
    var tempMonsters2 = tempLocations[tempLocation2];
    if (tempMonsters2.length > 1) {
      var logger = tempLocation2 + ' has been destroyed by ';
      for (var i=0; i<tempMonsters2.length; i++) {
        delete monsters[tempMonsters2[i]];
        if (i !== tempMonsters2.length-1) {
          logger += 'monster ' + tempMonsters2[i] + ', ';
        } else {
          logger += 'and monster ' + tempMonsters2[i];
        }
      }
      for (var tempLocationCheck in locations) {
        for (var direction in locations[tempLocationCheck]) {
          if (tempLocation2 === locations[tempLocationCheck][direction]) {
            delete locations[tempLocationCheck][direction];
          }
        }
      }
      delete locations[tempLocation2];
      console.log(logger);
    }
  }
};

var monstersCount = process.argv[2];

// synchronously read contents of map.txt to build locations object with nearby information
var locations = createLocations('map.txt');

// create monsters at random locations with temporary names
var monsters = createMonsters(monstersCount, locations);

// fight monsters at same location
fightMonsters(monsters, locations);

var round = 0;
while (round < 10000 && Object.keys(monsters).length) {
  // move each monster and fight monsters
  moveMonsters(monsters, locations);
  fightMonsters(monsters, locations);
  round++;
}
