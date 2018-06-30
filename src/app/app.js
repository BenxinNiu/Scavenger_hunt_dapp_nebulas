const app=angular.module("scavenger_hunt",['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('landing',{
        url: '/',
        templateUrl: "app/landing/landing.html"
    })
    $stateProvider.state('challenges',{
        url: '/challenges',
        templateUrl: "app/challenges/challenges.html"
    })

//dsas
});
