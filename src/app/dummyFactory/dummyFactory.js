app.factory('dummyData', function(){

    const scavengers = [
        {name:"Benxin",
            league: "IRON",
            logo: "",
            addr: "daskbdsabkjfbakjbfjsjsa123nja2j321",
            num_attempts: 10,
            num_answer: 8,
            asset: 200},
        {name:"batman",
            league: "FIRE",
            addr: "daskbdsabkjfbakjbfjsjsa123nja2j321",
            num_attempts: 10,
            num_answer: 8,
            asset: 200},
        {name:"robin",
            league: "WATER",
            addr: "daskbdsabkjfbakjbfjsjsa123nja2j321",
            num_attempts: 10,
            num_answer: 8,
            asset: 200},
        {name:"rookie",
            league: "ICE",
            addr: "daskbdsabkjfbakjbfjsjsa123nja2j321",
            num_attempts: 10,
            num_answer: 8,
            asset: 200}
    ];

    const challenges = [
        {question: "what is the tallest building in the world??",
            reward: 200,
            lontitute: "2323.323.213213",
            latitute: "23213.324412123..321"
        },
        {question: "what is the tallest building in the world??",
            reward: 200,
            lontitute: "2323.323.213213",
            latitute: "23213.324412123..321"
        },
        {question: "what is the tallest building in the world??",
            reward: 200,
            lontitute: "2323.323.213213",
            latitute: "23213.324412123..321"
        }
    ];

    const markers = [
        {lat: -25.344, lng: 131.036},
        {lat: -24.344, lng: 130.036}
    ];
    return {
        scavengers : scavengers,
        challenges : challenges,
        markers: markers
    };

});