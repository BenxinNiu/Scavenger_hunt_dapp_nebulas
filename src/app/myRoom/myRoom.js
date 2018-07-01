app.controller('myRoomController', ['$scope', '$state', 'contractInfo','dummyData', function($scope,$state,contractInfo,dummyData){

    const to_address = contractInfo.addr;
    const nebPay = contractInfo.nebPay;

    $scope.welcom_title = "Welcome to Scavenger Room";
    $scope.scavenger = {};
    $scope.right_board_title = "Action Center";
    $scope.left_board_title = "Scavenger Information";
    $scope.show_alert = false;
    $scope.go = (state)=>{
        console.log(state);
        $state.go(state);
    };

    const update_scavenger = (res) =>{
        if(typeof(res)==='string' && res.startsWith('Error')){
            alert("Ooops...Something went wrong, Please tey again later....");
        }
        else if (res === "not found"){
            alert("Not Scavenger Found! Please become one first!")
        }
        else{
            console.log(res.result);
            $scope.scavenger = JSON.parse(JSON.parse(res.result));
            console.log($scope.scavenger );
            $state.go('myroom');
        }
    };

    const update_res= (res)=>{
        if(typeof(res)==='string' && res.startsWith('Error')){
            alert("Ooops...Something went wrong, Please tey again later....");
        }
        else{
            $scope.show_alert = true;
            $scope.alert_msg = "Congratulations Your rewards should be available soon ";
            $state.go('myroom');
        }
    };

    const update_purchase = (res)=>{
        if(typeof(res)==='string' && res.startsWith('Error')){
            alert("Ooops...Something went wrong, Please tey again later....");
        }
        else{
            $scope.show_alert = true;
            $scope.alert_msg =  "Purchase Request submitted, please refresh after successful transaction!";
            $state.go('myroom');
        }
    };

    $scope.buy_teleport = (num)=>{
        nebPay.call(to_address,0,'buy_teleport',JSON.stringify([num]),{
            listener: update_purchase
        });
    };

    $scope.claim_reward = ()=>{
        $scope.show_alert = false;
        nebPay.call(to_address,0,'claim_asset',null,{
            listener: update_res
        });
    };

    const whoami = ()=>{
        nebPay.simulateCall(to_address,0,'whoami_scavenger',null,{
            listener: update_scavenger
        })
    };

    angular.element(document).ready(function(){
        whoami();
    });
}]);