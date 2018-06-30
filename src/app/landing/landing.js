app.controller('LandingController', ['$scope', '$state', 'contractInfo','dummyData', function($scope,$state,contractInfo,dummyData){

    const to_address = contractInfo.addr;
    const nebPay = contractInfo.nebPay;

    $scope.welcom_title = "Welcome Scavenger";
    $scope.sub_title = "Shall we begin Now... Here is what we have for you!";
    $scope.scavenger_board_title = "Leader Board";
    $scope.puzzel_board_title = "Challenges for Scavangers"

    $scope.scavengers = dummyData.scavengers;
    $scope.challenges = dummyData.challenges;

    $scope.go = function(page){
        $state.go(page);
    }
}]);