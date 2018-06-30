'use script';
app.controller('ChallengeController', ['$scope', '$state', 'contractInfo','dummyData', function($scope,$state,contractInfo,dummyData){

    const to_address = contractInfo.addr;
    const nebPay = contractInfo.nebPay;

    $scope.title = "Challenges Map";
    $scope.challenges = dummyData.challenges;
    $scope.map_failed = false;
    $scope.markers_list = dummyData.markers;
    $scope.show_alert = false;
    $scope.currentLocation=null;

    $scope.submit_answer = function(answer, index){
   console.log(index);
   alert(answer);
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

    const initMap = ()=> {
        let uluru = {lat: -25.344, lng: 131.036};

        let map = new google.maps.Map(
                document.getElementById('map'), {zoom: 4, center: uluru}
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
    show_map();
    getCurrentLocation();

}]);