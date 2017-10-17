import angular from 'angular';
import HouseModule from './houses'
import '../style/app.scss';

class AppCtrl  {

    constructor() {

    }

    $onInit() {

    }
}

let AppComponent = {
    template: require('./app.tpl.html'),
    controller: 'AppCtrl',
    controllerAs: 'vm'
}

let app = angular.module('app', [HouseModule])
    .controller('AppCtrl', AppCtrl)
    .component('app', AppComponent)
    .name;

export default app;
