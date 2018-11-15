var urlShortenerApp = angular.module('urlShortenerApp',['ngRoute']);

urlShortenerApp.config(function($routeProvider){

     $routeProvider
	    .when('/shortener', {templateUrl:'app/shortener/shortener.html', controller:'urlShortenerController'})
         .when('/dashboard', {templateUrl:'app/dashboard/dashboard.html'})
         .otherwise({redirectTo:'/shortener'});
});
