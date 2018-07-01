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
    };

    const update_challenges = (res)=>{
        if(typeof(res)==='string' && res.startsWith('Error')){
            alert("Something went wrong, Please tey again later....")
        }
        else{
            let coords = [];
            let raw_res = JSON.parse(res.result);
            let cooked_res = JSON.parse(raw_res);
            for(let i=0; i<cooked_res.length; i++){
                let coord = {};
                coord.lng = cooked_res[i].lng;
                coord.lat = cooked_res[i].lat;
                coords.push(coord);
                cooked_res[i].clicked = false;
            }
            $scope.challenges = cooked_res;
            $scope.markers_list = coords;
            $state.go('challenges');
        }
    };

    const get_challenges = ()=>{
        nebPay.simulateCall(to_address,0,"get_all_puzzels",null,{
            listener: update_challenges
        })
    };
}]);