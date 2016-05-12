/**
 * Created by Taru on 24.3.2016.
 */

var app = angular.module('AvatarTracker');

app.controller('NavController',['$scope','$state','$http','$location', function($scope, $state, $http, $location){

    if(localStorage['User-Data']) {
        $scope.signedIn = true;
    } else {
        $scope.signedIn = false;
    }

    $scope.signin = function() {
        $http.post('api/user/signin', $scope.user).success(function(response){
            localStorage.setItem('User-Data', JSON.stringify(response));
            if(response.status === 'OK') {
                $scope.signedIn = true;
                $location.path('/profile');
            } else {
                $scope.signedIn = false;
                $location.path('/');
            }
        }).error(function(error){
            $location.path('/');
            console.log(error);
        });
    }

    $scope.signout = function(){
        localStorage.clear();
        $scope.signedIn = false;
        $location.path('/');
    }
}]);