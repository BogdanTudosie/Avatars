/**
 * Created by Taru on 20.3.2016.
 */

var app = angular.module("AvatarTracker");

app.controller('MainController',['$scope', function($scope){

    $scope.message = 'Hello from the Main Scope';

    $scope.sayHello = function() {
        console.log('Hello World');
    }
}]);