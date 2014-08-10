/*jshint indent: 2*/
'use strict';

var fs = require('fs');

var monsterCount = process.argv[2];

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
  var randomLocationIndex = Math.floor(Math.random() * locationNames.length);
  monsters[i].location = locationNames[randomLocationIndex];
}