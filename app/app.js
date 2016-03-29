/**
 * Created by Taru on 20.3.2016.
 */

// this file contains the main app file for the Angular.js Part

var app = angular.module('AvatarTracker', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: "/",
        templateUrl: "views/main/main.html",
        controller: "MainController"
    });
}]);