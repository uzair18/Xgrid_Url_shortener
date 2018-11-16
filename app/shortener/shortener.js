var urlShortenerApp = angular.module('urlShortenerApp');

urlShortenerApp.controller("urlShortenerController", function($scope, $http, $localStorage){

     var apiKey = "2aedfddee819a011e21f086ed6a4b0c95b39c93f";
     var baseUrl = "https://api-ssl.bitly.com/v3/";
     $scope.recaptchaKey = "6Lft33oUAAAAAD29roKW1Mnbq4EM8_qRrYtvM_lx";

     $scope.shortUrl = "";
     $scope.isError = false;
     $scope.showOutput = false;
     $scope.correctCaptcha = false;

     window.checkCorrectCaptcha = function(res)
     {
          if (res == "" || res == undefined || res.length == 0)
               $scope.correctCaptcha = false;
          else
               $scope.correctCaptcha = true;
     };

     $scope.resetCaptcha = function()
     {
          grecaptcha.reset();
          $scope.correctCaptcha = false;
     }

     $scope.getShortenedUrl = function(url)
     {
          if (url == "" || url == undefined || url.length == 0)
               return;
          //Check url input and encode it
          var pattern = /^((http|https|ftp):\/\/)/;
          if(!pattern.test(url))
               url = "http://" + url;
          url = encodeURIComponent(url);

          //Check for Captcha
          if ($scope.correctCaptcha)
          {
               $http.get(baseUrl+"shorten?access_token="+apiKey+"&longUrl="+url)
                    .then(function(response)
                    {
                         if (response.data.data == "")
                         {
                              $scope.shortUrl = "Incorrect long URL.";
                              $scope.isError = true;
                         }
                         else
                         {
                              $scope.shortUrl = response.data.data.url;
                              if ($localStorage.savedLinks == "" || $localStorage.savedLinks == undefined
                                   || $localStorage.savedLinks.length == 0)
                              {
                                   $localStorage.savedLinks = [$scope.shortUrl];
                              }
                              else
                                   $localStorage.savedLinks.push($scope.shortUrl);
                         }
                    },
                    function(response)
                    {
                         $scope.shortUrl = "Error";
                         $scope.isError = true;
                    });
          }
          else
          {
               $scope.shortUrl = "Please verify you're not a robot!";
               $scope.isError = true;
          }
          $scope.showOutput = true;
          $scope.resetCaptcha();
     };


     $scope.copyToClipboard = function (str)
     {
          var copyElement = document.createElement("textarea");
          copyElement.style.position = 'fixed';
          copyElement.style.opacity = '0';
          copyElement.textContent = str;
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(copyElement);
          copyElement.select();
          document.execCommand('copy');
          body.removeChild(copyElement);
     };

});
