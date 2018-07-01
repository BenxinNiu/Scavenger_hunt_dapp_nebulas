app.controller('LandingController', ['$scope', '$state', 'contractInfo','dummyData', function($scope,$state,contractInfo,dummyData){

    const to_address = contractInfo.addr;
    const nebPay = contractInfo.nebPay;

    $scope.welcom_title = "Welcome Scavenger";
    $scope.sub_title = "Shall we begin Now... Here is what we have for you!";
    $scope.scavenger_board_title = "Leader Board";
    $scope.puzzel_board_title = "Challenges for Scavangers"

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
            $scope.challenges = cooked_res.reverse();
            $scope.markers_list = coords;
            $state.go('landing');
        }
    };

    const update_scavengers = (res)=>{
        if(typeof(res)==='string' && res.startsWith('Error')){
            alert("Something went wrong, Please tey again later....")
        }
        else{
            let result=[];
            let raw_res = JSON.parse(res.result);
            let cooked_res = JSON.parse(raw_res);
            cooked_res.forEach((a)=>{
                result.push(JSON.parse(a));
            });
            $scope.scavengers = result;
            $state.go('landing');
            console.log($scope.scavengers)
        }
    }

    const get_challenges = ()=>{
        nebPay.simulateCall(to_address,0,"get_all_puzzels",null,{
            listener: update_challenges
        })
    };

    const get_scavengers = ()=>{
        nebPay.simulateCall(to_address,0,"get_all_scavenger",null,{
            listener: update_scavengers
        })
    };

    $scope.scavengers = get_scavengers();
    $scope.challenges = get_challenges();

    $scope.go = function(page){
        $state.go(page);
    };


}]);