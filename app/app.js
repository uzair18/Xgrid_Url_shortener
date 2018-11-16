var urlShortenerApp = angular.module('urlShortenerApp',['ngRoute', 'ngStorage']);

urlShortenerApp.config(function($routeProvider){

     $routeProvider
	    .when('/shortener', {templateUrl:'app/shortener/shortener.html', controller:'urlShortenerController'})
         .when('/dashboard', {templateUrl:'app/dashboard/dashboard.html', controller:'dashboardController'})
         .otherwise({redirectTo:'/shortener'});
});
