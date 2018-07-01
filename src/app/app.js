const app=angular.module("scavenger_hunt",['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('landing',{
        url: '/',
        templateUrl: "app/landing/landing.html"
    });
    $stateProvider.state('challenges',{
        url: '/challenges',
        templateUrl: "app/challenges/challenges.html"
    });
    $stateProvider.state('newchallenge',{
        url: '/newchallenge',
        templateUrl: "app/submitChallenge/submitChallenge.html"
    });
    $stateProvider.state('myroom',{
        url: '/myroom',
        templateUrl: "app/myRoom/myRoom.html"
    });
    $stateProvider.state('about',{
        url: '/about',
        templateUrl: "app/about/about.html"
    })
//dsas
});
