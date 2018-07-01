app.controller('aboutController', ['$scope', '$state', 'contractInfo','dummyData', function($scope,$state,contractInfo,dummyData){

    $scope.go=(state)=>{
        $state.go(state);
    };

    $scope.title = "About Scavenger Hunt";
    $scope.intro = "Thanks to Nebulas Platform, this Decentralized App came to life. It bring the traditional experience of Scavenger Hunt, but better in every way! "+
        "Player can become a Scavenger in this world and create challenge for others or solve challenges placed by other Scavengers. rewards are given to Scavengers who give the correct answer "+
        "Oh.. Also, each Challenge is located at a specific coordinates, you need to be near there in order to submit your answer... Or, did I mention you could use Teleport card?? By default, if you are "+
        " not near the location, a card will be consumed when you submit your answer, but you can always buy more using the rewards you have!!";
    $scope.scavenger = "Before creating your challenge your questions or answering them, you need to become a Scavenger. Otherwise, SmartContract will ignore your transaction!!!";
    $scope.info = "The pro mode includes a live view of where the challenges are. It is powered by Google Map API. This map view won't be usable " +
        "if you are in a region where Google service is not available, however, other functionality are not affected by your geo location. We are also working on other Map source integration " +
        " other that Google Map, so that all country have a supported version. Stay tuned!!"
}]);
