import angular from 'angular';
import HousesCtrl from './houses.ctrl';
import HousesComponent from './houses.component'


let houseApp = angular.module('house', [])
    .controller('HousesCtrl', HousesCtrl)
    .component('houseComponent', HousesComponent)
    .name;

module.exports = houseApp;
