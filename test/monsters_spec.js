/*jshint indent: 2*/
'use strict';

var should = require('should');
var Monsters = require('../lib/monsters');

describe('Monsters methods:', function () {

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
      
    var result = Monsters.create(4, locations);

    it('should create 4 monsters with default names', function () {
      Object.keys(result).length.should.eql(4);
      result.should.have.property('1');
      result.should.have.property('2');
      result.should.have.property('3');
      result.should.have.property('4');
    });

    it('should create monsters with location property', function () {
      result['1'].should.have.property('location');
      result['2'].should.have.property('location');
      result['3'].should.have.property('location');
      result['4'].should.have.property('location');
    });

  });

  describe('.move:', function () {

    var monsters = {
      '1': {
        location: 'Denalmo',
      },
      '2': {
        location: 'Esmosno'
      }
    };
    Monsters.move(monsters, locations);
    var destinations = {
      '1': ['Asnu', 'Dinexe'],
      '2': ['Denalmo', 'Esmosno']
    };

    it('should move monsters location around map', function () {
      destinations['1'].should.containEql(monsters['1'].location);
      destinations['1'].should.containEql(monsters['2'].location);
    });

  });

  describe('.fight:', function () {

    var monsters = {
      '1': {
        location: 'Denalmo',
      },
      '2': {
        location: 'Denalmo'
      }
    };
    Monsters.fight(monsters, locations);

    it('should destroy fighting monsters at same location', function () {
      Object.keys(monsters).should.have.length(0);
    });

    it('should destroy location of fighting monsters', function () {
      Object.keys(locations).should.have.length(3);
    });

    it('should destroy paths to destroyed location', function () {
      Object.keys(locations.Asnu).should.have.length(1);
      Object.keys(locations.Dinexe).should.have.length(1);
      Object.keys(locations.Esmosno).should.have.length(2);
    });

  });

});