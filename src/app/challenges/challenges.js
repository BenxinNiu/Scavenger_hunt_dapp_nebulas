'use script';
app.controller('ChallengeController', ['$scope', '$state', 'contractInfo','dummyData', function($scope,$state,contractInfo,dummyData){

    const to_address = contractInfo.addr;
    const nebPay = contractInfo.nebPay;

    $scope.title = "Challenges Map on Nebulas";
    $scope.challenges = dummyData.challenges;
    $scope.map_failed = false;
    $scope.markers_list = dummyData.markers;
    $scope.show_alert = false;
    $scope.currentLocation=null;
    $scope.go = (state)=>{
        console.log(state);
        $state.go(state);
    };


    const checkForLocation = (lng, lat)=>{
        if($scope.currentLocation == null)
            return true;
        else{
            let lng_diff = Math.abs(Math.floor($scope.currentLocation.lng)-Math.floor(lng));
            let lat_diff = Math.abs(Math.floor($scope.currentLocation.lat)-Math.floor(lat));
            if(lng_diff<2 && lat_diff < 2){
                return false;
            }
            else
                return true;
        }
    };

    const update_res = (res)=>{
        if(typeof(res)==='string' && res.startsWith('Error')){
            alert("Something went wrong, Please tey again later....");
        }
        else{
            $scope.show_alert = true;
            $scope.alert_msg = "Submission Result: "+ res;
            $state.go('challenges');
        }
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

    $scope.submit_answer = function(answer, index){
        let req = {};
        $scope.show_alert = false;
        if(!$scope.challenges[index].clicked) {
            let challenge_id = $scope.challenges[index].id;
            $scope.challenges[index].clicked = true;
            req.id=challenge_id;
            req.answer = answer;
            if(checkForLocation($scope.challenges[index].lng,$scope.challenges[index].lat))
                req.travel = "teleport";
            else
                req.travel = "no";
        nebPay.call(to_address,0,'submit_answer',JSON.stringify([JSON.stringify(req)]),{
            listener: update_res
        })
        }
        else{
            $scope.show_alert = true;
            $scope.alert_msg = "You Have Already Submitted your answer!";
        }
    };
    // true = need teleport

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

    const initMap = ()=> {
        let uluru = {lat: -25.344, lng: 131.036};
        let map_tag = document.getElementById('map');
        let map = new google.maps.Map(
                map_tag, {zoom: 2, center: uluru}
                );
        $scope.markers_list.forEach(function(a){
            let marker =  new google.maps.Marker({position: a, map: map})
        });
    };
    const show_map= ()=>{
        if (typeof google === 'object' && typeof google.maps === 'object') {
           initMap();
            $scope.map_failed = false;
        }
        else{
            $scope.map_failed = true;
            $scope.map_fail_msg = "Google Map loading Failed, Please Ensure you are in Region where Google Service is supported "+
                                  "If you Believe this is a mistake, Please refresh the page. Thank you! " +
                                  "We are currently working on Map integration from source other than Google to Support regions where "+
                                  "Google may not be avalible...";
        }
    };
    angular.element(document).ready(function(){
        show_map();
        getCurrentLocation();
    });

}]);