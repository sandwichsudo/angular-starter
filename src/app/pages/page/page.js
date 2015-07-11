angular.module("home", [])

  .config(function ($stateProvider) {

    $stateProvider
     .state('home', {
        abstract: true,
         templateUrl: 'pages/page/page.html',
         controller: function($scope) {
            $scope.currentItemId = 'Hello Dad';
            console.log($scope.currentItemId);
              $scope.$watch('currentItemId', function() {
                console.log('hey, currentItemId has changed in home ctrl!');
             });
         }
        })
      .state('home.calendar', {
        parent: 'home',
        url: '/home',
        views: {
          'list@home': {
             
            templateUrl: 'pages/home/home.html',
            controller: 'ListCtrl as list',
            resolve: {
                collection: function ($http, appService) {
                  return appService.getCollection()
                    .then(function (res) {
                      return res.data;
                    });
                }
            }
          },
          'detail@home': {
      
            templateUrl: 'pages/detail-page/detail-page.html',
            controller: 'DetailCtrl as detail'
          }
        }
      });
  })
  .controller("ListCtrl",[ 'BASE_URL', 'collection','$scope', function (BASE_URL,collection,$scope) {
    var list = this;
    list.BASE_URL = BASE_URL;
    list.collection = collection;
    list.setCurrentItemId=function(id){
      $scope.currentItemId = id;
      console.log($scope.currentItemId);
    };
     list.currentThing = $scope.currentItemId;

     $scope.$watch('currentItemId', function() {
       console.log('hey, currentItemId has changed in list ctrl!');
   });

    console.log($scope.currentItemId);
  }])
  .controller("DetailCtrl",[ 'BASE_URL','$scope', function (BASE_URL,$scope) {
    var detail = this;

    detail.currentThing = $scope.currentItemId;


   $scope.$watch('currentItemId', function() {
       console.log('hey, currentItemId has changed in detail ctrl!');
   });

    console.log($scope.currentItemId);
  }]);
