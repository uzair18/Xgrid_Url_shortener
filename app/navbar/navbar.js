var urlShortenerApp = angular.module('urlShortenerApp');

urlShortenerApp.controller("navbarController", function($scope, $location){

     $scope.isActive = function(viewLocation)
     {
          return viewLocation==$location.path();
     };

});
