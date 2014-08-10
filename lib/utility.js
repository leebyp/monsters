/*jshint indent: 2*/
'use strict';

exports.randomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};
