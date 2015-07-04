angular.module('components', [])
  .directive('appheader', function () {
    return {
        templateUrl: 'components/templates/appheader.html',
        scope: {
          page: "="
        }
    };
  })
  .directive('appnav', function () {
    return {
        templateUrl: 'components/templates/appnav.html',
        scope: {
          navobject: "="
        }
    };
  })
  .directive('itemlist', function () {
    return {
        templateUrl: 'components/templates/itemlist.html',
        scope: {
          collection: "="
        }
    };
  })
  .directive('iteminfo', function () {
    return {
        templateUrl: 'components/templates/iteminfo.html',
        scope: {
          item: "="
        }
    };
  });
