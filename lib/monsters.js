/*jshint indent: 2*/
'use strict';

var Utility = require('./utility');

exports.create = function (monstersCount, locations) {
  var monsters = {};
  for (var i=1; i<=monstersCount; i++) {
    monsters[i] = {};
    var locationNames = Object.keys(locations);
    monsters[i].location = Utility.randomValue(locationNames);
  }
  return monsters;
};

exports.move = function (monsters, locations) {
  for (var monster in monsters) {
    var oldLocation = monsters[monster].location;
    // find random path and update monster's location
    var directions = Object.keys(locations[oldLocation]);
    var randomDirection = Utility.randomValue(directions);
    // monster remains stationary if no path available
    if (randomDirection) {
      monsters[monster].location = locations[oldLocation][randomDirection];
    } else {
      monsters[monster].location = oldLocation;
    }
  }
};

exports.fight = function (monsters, locations) {
  // build locations with array of monsters there
  var tempLocations = {};
  for (var monster in monsters) {
    if (!tempLocations[monsters[monster].location]) {
      tempLocations[monsters[monster].location] = [];
    }
    tempLocations[monsters[monster].location].push(monster);
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
