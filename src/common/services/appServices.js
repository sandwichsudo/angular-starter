angular.module("appServices", [])
  .constant("BASE_URL", "http://localhost:31416")
  .constant("THING_URL", "/api/nerds")
  .constant("PAGES_URL", "/api/pages")
  .service("appService", function ($http, BASE_URL,THING_URL) {
    this.getCollection = function () {
       return  $http.get(BASE_URL + THING_URL);
    };
  }) 
  .service("navService", function ($http, BASE_URL,THING_URL,PAGES_URL) {
    this.getNavObject = function () {
      return  $http.get(BASE_URL + THING_URL)
      .then(function(res) {
          var navObject ={};
          navObject.collection = res.data; 
          return $http.get(BASE_URL + PAGES_URL)
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

