app.directive("navBar",function(){
    return{
        restrict: 'E',
        scope: {
            info : '='
        },
        templateUrl:"app/navBar/navBar.html"
    }
});
