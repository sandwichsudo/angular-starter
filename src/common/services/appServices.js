angular.module("appServices", [])
  .constant("BASE_URL", "http://localhost:31415")
  .service("appService", function ($http, BASE_URL) {
    this.getCollection = function () {
      return $http.get(BASE_URL + "/data/collection.json");
    };
  }) 
  .service("navService", function ($http, BASE_URL) {
    this.getNavObject = function () {
      return $http.get(BASE_URL + "/data/collection.json")
      .then(function(res) {
          var navObject ={};
          navObject.collection = res.data; 
          return $http.get(BASE_URL + "/data/pages.json")
            .then(function(res) {
              navObject.pages = res.data; 
              navObject.isNavOpen = false;
              return navObject;
    		    }, function(reason) {
    		      console.err("Could not get Nav object");
            });
          }, 
          function(reason) {
            console.err("Could not get collection object");
		      }
      );
    };
  });

