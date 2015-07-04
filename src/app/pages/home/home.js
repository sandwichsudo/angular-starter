angular.module("home", [])

  .config(function ($stateProvider) {

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'pages/home/home.html',
      controller: 'HomeCtrl as home',
      resolve: {
        collection: function ($http, appService) {
          return appService.getCollection()
            .then(function (res) {
              return res.data;
            });
        },
        navObject:function ($http, navService) {
           return navService.getNavObject()
            .then(function (res) {
              return res;
            });
        }
      }
    });


  })

  .controller("HomeCtrl", function (collection,navObject, BASE_URL) {
    var home = this;
    home.BASE_URL = BASE_URL;
    home.collection = collection;
    home.navObject = navObject;

    console.log(navObject);
  });


