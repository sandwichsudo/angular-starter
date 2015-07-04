angular.module("detailpage", [])

  .config(function ($stateProvider, BASE_URL) {

    $stateProvider.state('detailpage', {
      url: '/detail-page/:id',
      templateUrl: 'pages/detail-page/detail-page.html',
      controller: 'detailpageCtrl as detailpage',
      resolve: {
        item: function ($http, $stateParams, appService) {
          return appService.getCollection()
            .then(function (res) {
              var collection =  res.data;
              for (var i = collection.length - 1; i >= 0; i--) {
                var nextItem = collection[i];
                if(nextItem.id === $stateParams.id){
                  return nextItem;
                }
              }
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


  .controller("detailpageCtrl", function (item, navObject, BASE_URL) {
    var detailpage = this;
    detailpage.navObject = navObject;
    detailpage.item = item;
    detailpage.BASE_URL = BASE_URL;
  });
