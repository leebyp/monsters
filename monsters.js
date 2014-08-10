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
    if (randomDirection) {
      monsters[monster].location = locations[oldLocation][randomDirection];
    } else {
      monsters[monster].location = oldLocation;
    }
  }
};

exports.fight = function (monsters, locations) {
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
