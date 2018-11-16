var urlShortenerApp = angular.module('urlShortenerApp');

urlShortenerApp.controller("dashboardController", function($scope, $http, $localStorage, $interval){
     var apiKey = "2aedfddee819a011e21f086ed6a4b0c95b39c93f";
     var baseUrl = "https://api-ssl.bitly.com/v3/";

     $scope.linksDetails = [];
     $scope.links = $localStorage.savedLinks;

     //for testing using stored links
     //$localStorage.savedLinks = ["http://bit.ly/2QIGzuV", "http://bit.ly/2PVudm1", "http://bit.ly/2PW0md4"];
     
     //get info on the short url
     function getShortUrlInfo(i)
     {
          $http.get(baseUrl+"info?access_token="+apiKey+"&shortUrl="+$scope.linksDetails[i].short)
               .then(function(response)
               {
                    $scope.linksDetails[i].title = response.data.data.info[0].title;
                    $scope.linksDetails[i].createdAt = response.data.data.info[0].created_at;
               },
               function(response)
               {
                    console.log(response);
               });
     };

     //expand the short url to its original
     function getLongUrl(i)
     {
          $http.get(baseUrl+"user/link_lookup?link="+$scope.linksDetails[i].short+"&access_token="+apiKey)
               .then(function(response)
               {
                    $scope.linksDetails[i].long = response.data.data.link_lookup[0].url;
               },
               function(response)
               {
                    console.log(response);
               });
    };

    //get clicks on short url
    function getClicks(i)
    {
         $http.get(baseUrl+"link/clicks?link="+$scope.linksDetails[i].short+"&access_token="+apiKey)
              .then(function(response)
              {
                   $scope.linksDetails[i].clicks = response.data.data.link_clicks;
              },
              function(response)
              {
                   console.log(response);
              });
     };

     //build details of links to be displayed
     function buildLinksDetails()
     {
          if ($scope.links == "" || $scope.links == undefined || $scope.links == 0)
               return;
          $scope.linksDetails = [];
          for(i=0;i<$scope.links.length;i++)
          {
               $scope.linksDetails.push({short:$scope.links[i], title:"", long:"", clicks:"", createdAt:""});
               getLongUrl(i);
               getClicks(i);
               getShortUrlInfo(i);
          }
     }

     buildLinksDetails();

     function updateDashboard()
     {
          buildLinksDetails();
     }

     $interval(updateDashboard, 20000);
});
