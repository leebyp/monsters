/*jshint indent: 2*/
'use strict';

var should = require('should');
var Locations = require('../lib/locations');

describe('Locations methods:', function () {

  var locations = {
    Denalmo:  {
      north:  'Asnu',
      east:   'Dinexe'
    },
    Asnu:     {
      south:  'Denalmo',
      east:   'Esmosno'
    },
    Esmosno:  {
      south:  'Dinexe',
      west:   'Asnu'
    },
    Dinexe:   {
      north:  'Esmosno',
      west:   'Denalmo'
    }
  };

  describe('.create:', function () {

    var result = Locations.create(__dirname + '/input/map_test.txt');

    it('should create locations object from file', function () {
      result.should.eql(locations);
    });

  });

  describe('.log:', function () {

    var result = Locations.log(locations);
    var logs = 'Denalmo north=Asnu east=Dinexe\n' +
      'Asnu south=Denalmo east=Esmosno\n' +
      'Esmosno south=Dinexe west=Asnu\n' +
      'Dinexe north=Esmosno west=Denalmo\n';
      
    it('should re-log locations from object', function () {
      result.should.eql(logs);
    });

  });

});