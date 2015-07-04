angular.module('app', 
	['ui.router','ngAnimate', 'components', 
	'appServices', 'home','detailpage'])

  .run(function ($state) {
    $state.go('home');
  });
