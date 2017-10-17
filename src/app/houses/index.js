import angular from 'angular';
import HousesCtrl from './houses.ctrl';
import HousesComponent from './houses.component'
import HousesSvc from './houses.svc';


let houseApp = angular.module('house', [])
    .controller('HousesCtrl', HousesCtrl)
    .component('houseComponent', HousesComponent)
    .service('housesSvc', HousesSvc)
    .name;

module.exports = houseApp;
