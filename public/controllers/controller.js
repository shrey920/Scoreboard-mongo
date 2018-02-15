/**
 * Created by mishal23 on 16/7/17.
 */
var app=angular.module('app',[]);

app.controller('AppCtrl',['$scope','$http',function ($scope,$http) {

    var refresh = function () {
        $http.get('/contactlist').then(function (response) {
           console.log("Requested data received");
            var contactlist = response.data;
            console.log(response.data);
            $scope.contactlist = contactlist;
        });
    };

    refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        $scope.contact.time = (parseInt($scope.contact.b1time) ||0) + (parseInt($scope.contact.b2time)||0) + (parseInt($scope.contact.b3time)||0);
        $scope.contact.score = (parseInt($scope.contact.b1score)||0) + (parseInt($scope.contact.b2score)||0) + (parseInt($scope.contact.b3score)||0);

        console.log($scope.contact.time);
        console.log($scope.contact.score);
        $http.post('/contactlist',$scope.contact).then(function (response) {
            console.log(response);
            $scope.contact = {};
            refresh();
        });
    };

    $scope.delete = function (id) {
        console.log(id);
        $http.delete('/contactlist/' + id).then(function (response) {
            refresh();
        });
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/contactlist/' + id).then(function (response) {
           console.log(response.data);

            $scope.contact = response.data;
        });
    };
    
    $scope.update = function (id) {
        console.log(id);
        console.log("Sending to POST");
        $scope.contact.time = (parseInt($scope.contact.b1time) ||0) + (parseInt($scope.contact.b2time)||0) + (parseInt($scope.contact.b3time)||0);
        $scope.contact.score = (parseInt($scope.contact.b1score)||0) + (parseInt($scope.contact.b2score)||0) + (parseInt($scope.contact.b3score)||0);

        $http.put('/contactlist/' + id,$scope.contact).then(function (response) {
            refresh();
            $scope.contact={};
        });
    };
    
    $scope.clear = function () {
        $scope.contact = {};
    }
}]);