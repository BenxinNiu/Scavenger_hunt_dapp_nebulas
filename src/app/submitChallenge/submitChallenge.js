app.controller('newChallengeController', ['$scope', '$state', 'contractInfo','dummyData', function($scope,$state,contractInfo,dummyData) {

    const to_address = contractInfo.addr;
    const nebPay = contractInfo.nebPay;

    $scope.step_one = "Become a Scavenger First!";
    $scope.step_two = "Create Your Challenge";
    $scope.show_alert = false;
    $scope.currentLocation = null;
    $scope.go = (state)=>{
        $state.go(state);
    };

    const res_update = (res)=>{
        if(typeof(res)==='string' && res.startsWith('Error')){
            alert("Something went wrong, Please tey again later....")
        }
        else{
            $scope.show_alert = true;
            $scope.alert_msg = res.result;
        }
    };

    const showPosition = (position)=>{
        let coordinates = {
            lat : position.coords.latitude,
            lng : position.coords.longitude
        };
        $scope.currentLocation = coordinates;
    };

    const getCurrentLocation = ()=>{
        if (navigator.geolocation) {
            console.log("");
            return navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    $scope.register = ()=> {
        $scope.show_alert = false;
        let name = $('#usr_name').val();
        let league = $('#league').val();
        let req = {
            name: name,
            league: league
        };
        console.log(req);
        nebPay.call(to_address, 0, "register_scavenger", JSON.stringify([JSON.stringify(req)]), {
            listener: res_update
    })
    };

    $scope.submit_challenge = ()=> {
        let coord={};
        if($scope.currentLocation == null){
            coord.lat = 43.6;
            coord.lng = 79.2;
        }
        else{
            coord = $scope.currentLocation;
        }
        $scope.show_alert = false;
        let question = $('#question').val();
        let answer  = $('#answer').val();
        let reward = $('#reward').val();
        let req = {
            question : question,
            answer: answer,
            reward: parseInt(reward),
            lat: coord.lat,
            lng: coord.lng
        };
        console.log(req);
        nebPay.call(to_address, 0, "create_new_puzzel", JSON.stringify([JSON.stringify(req)]), {
            listener: res_update
        })
    }

}]);