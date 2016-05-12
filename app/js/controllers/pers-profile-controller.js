/**
 * Created by Taru on 29.3.2016.
 */

var app = angular.module('AvatarTracker');

app.controller('PersProfileController', ['$scope', '$http', function($scope, $http){


    $scope.profile = {};
    $scope.errorMessage = '';
    $scope.userData = JSON.parse(localStorage.getItem('User-Data'));
    $scope.isAdmin = false;

    // do we have local storage data
    if(localStorage['User-Data']) {
        $scope.isAuth = true;
        $scope.userId = $scope.userData.id;
    }
    else {
        $scope.isAuth = false;
    }

    /**
     * Finds my profile information and displays them
     */
    $scope.findMyData = function() {

        var data = {
            isAuth: $scope.isAuth,
            userid: $scope.userId
        }

        $http.post('/api/user/findme', data).success(function(response) {
            if(response) {
                if(response.status === 'FAIL') {
                    $scope.errorMessage = response.message;
                } else {
                    $scope.profile = response;
                    if(response.role === "admin") {
                        $scope.isAdmin = true;
                    } 
                    else {
                        $scope.isAdmin = false;
                    }
                }
            } else {
                console.log('No Response received');
            }
        }).error(function(error){
            if(error) {
                console.log(error);
            }
        });
    }

    $scope.editProfile = function() {
        console.log('Edit profile');
    }
}]);