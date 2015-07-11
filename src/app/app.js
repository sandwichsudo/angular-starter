angular.module('app', 
	['ui.router','ngAnimate', 'components', 
	'appServices', 'home'])

  .run(function ($state) {
    $state.go('home.calendar');
  });
