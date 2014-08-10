/*jshint indent: 2*/
'use strict';

var fs = require('fs');

exports.randomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

exports.output = function (outputFile, data) {
  fs.writeFileSync(outputFile, data);
};
