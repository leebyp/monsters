/*jshint indent: 2*/
'use strict';

var fs = require('fs');

exports.create = function (mapFile) {
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

exports.log = function (locations) {
  var result = '';
  for (var location in locations) {
    result += location;
    var directions = Object.keys(locations[location]);
    for (var i=0; i<directions.length; i++) {
      result += ' ' + directions[i] + '=' + locations[location][directions[i]];
    }
    result += '\n';
  }
  return result;
};
