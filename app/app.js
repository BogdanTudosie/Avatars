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
    }).state('signup', {
        url: '/signup',
        templateUrl: '/views/signup/signup.html',
        controller: 'SignupController'
    }).state('about', {
        url: '/about',
        templateUrl: 'views/about/about.html'
    }).state('history', {
        url: '/history',
        templateUrl: 'views/history/history.html'
    }).state('profile', {
        url: '/profile',
        templateUrl: 'views/profile/my-profile.html',
        controller: 'PersProfileController'
    });
}]);