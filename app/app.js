var urlShortnerApp = angular.module('urlShortnerApp',[]);



urlShortnerApp.controller("urlShorterController", function($scope, $http){

$scope.apiKey = "2aedfddee819a011e21f086ed6a4b0c95b39c93f"
$scope.baseUrl = "https://api-ssl.bitly.com/v3/"

$scope.url = ""

$scope.getShortenedUrl= function(url){


$http.get($scope.baseUrl+"shorten?access_token="+$scope.apiKey+"&longUrl="+url)
    	.then(function(response) {
						if (response.data.data == "")
							$scope.url = response.data.status_txt;
						else
							$scope.url = response.data.data.url;
						},

						function(response) {$scope.url = "Error"});

}




});
