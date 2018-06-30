'use strict';

const scavenger_contract = function(){

LocalContractStorage.defineMapProperty(this, "puzzel_list");
LocalContractStorage.defineMapProperty(this, "puzzel_id_list");
LocalContractStorage.defineMapProperty(this, "scavenger_list");
LocalContractStorage.defineMapProperty(this, "scavenger_addr_list");

LocalContractStorage.defineProperty(this, "scavengers_id");
LocalContractStorage.defineProperty(this,"scavenger_list_index");
LocalContractStorage.defineProperty(this, "puzzel_id");
LocalContractStorage.defineProperty(this,"puzzel_list_index");
LocalContractStorage.defineProperty(this,"reward_pool");
};


scavenger_contract.prototype = {
    init :function(){
        this.reward_pool = 100000;
        this.scavengers_id = 688;
        this.puzzel_id = 182;
        this.puzzel_list_index = 0;
        this.scavenger_list_index = 0;
    },

    get_all_puzzels: function(){
    let puzzels_list = [];
    for (let i=0; i<this.puzzel_list_index; i++){
        let puzzel_id = this.puzzel_id_list.get(i);
        puzzels_list.push(JSON.parse(this.puzzel_list.get(puzzel_id)));
        }
    return JSON.stringify(puzzels_list);
    },

    get_all_scavenger: function(){
    let scavengers = [];
    for(let i=0; i<this.scavenger_list_index; i++){
        let scavenger_addr = this.scavenger_addr_list.get(i);
        scavengers.push(this.scavenger_list.get(scavenger_addr));
    }
    return JSON.stringify(scavengers);
    },

    register_scavenger: function(req){
    let new_scavenger = JSON.parse(req);
    const trans_from = Blockchain.transaction.from;
    let scavenger = this.scavenger_list.get(trans_from);
    if(!scavenger){
        new_scavenger.id = this.scavengers_id++;
        new_scavenger.addr = trans_from;
        new_scavenger.asset = 100;
        new_scavenger.num_answer = 0;
        new_scavenger.puzzels = [];
        new_scavenger.attempts = 0;
        new_scavenger.num_teleport = 10;
        this.reward_pool += 100;
        this.scavenger_list.put(trans_from, JSON.stringify(new_scavenger));
        this.scavenger_addr_list.put(this.scavenger_list_index++, trans_from);
    }
    else{
        return "scavenger existed";
    }
    },

    create_new_puzzel: function(req){
    let new_puzzel = JSON.parse(req);
    const trans_from = Blockchain.transaction.from;
    let scavenger = this.scavenger_list.get(trans_from);
    if(!scavenger){
        return "scavenger not found";
    }
    else{
        scavenger = JSON.parse(scavenger);
        if (parseInt(scavenger.asset) >= parseInt(new_puzzel.reward)){
            new_puzzel.id = this.puzzel_id++;
            this.puzzel_list.put(new_puzzel.id, JSON.stringify(new_puzzel));
            this.puzzel_id_list.put(this.puzzel_list_index++, new_puzzel.id);
            scavenger.asset = parseInt(scavenger.asset) - parseInt(new_puzzel.reward);
            scavenger.puzzels = scavenger.puzzels.push(this.puzzel_id -1);
            this.scavenger_list.delete(trans_from);
            this.scavenger_list.put(trans_from, JSON.stringify(scavenger));
            return "puzzel created";
        }
        else{
            return "insufficient asset";
        }
    }
    },

    submit_answer: function(req){
    let scavenger_attempt = JSON.parse(req);
    const trans_from = Blockchain.transaction.from;
    let scavenger = this.scavenger_list.get(trans_from);
    let puzzel = this.puzzel_list.get(scavenger_attempt.id)
    if(!scavenger || !puzzel ){
        return "not found";
    }
    else{
    let scavenger = JSON.parse(scavenger);
    puzzel = JSON.parse(puzzel);
    let correct_answer = puzzel.answer.toString().toLowerCase();
    let scavenger_answer = scavenger_attempt.answer.toString().toLowerCase();
    scavenger.attempts = parseInt(scavenger.attempts) + 1;
    if(correct_answer.includes(scavenger_answer)){
        scavenger.num_answer = parseInt(scavenger.num_answer) + 1;
        scavenger.asset = parseInt(scavenger.asset) + parseInt(puzzel.award);
        puzzel.active = false;
        this.scavenger_list.delete(trans_from);
        this.scavenger_list.put(trans_from, JSON.stringify(scavenger));
        this.puzzel_list.delete(puzzel.id);
        this.puzzel_list.put(puzzel.id, JSON.stringify(puzzel))
    }
    else{
        return "wrong answer";
    }
    }
    },

    buy_teleport: function(num){
    const trans_from = Blockchain.transaction.from;
    let scavenger = this.scavenger_list.get(trans_from);
    if(!scavenger){
        return "not found";
    }
    else{
        scavenger = JSON.parse(scavenger);
        let scavenger_asset = scavenger.asset;
        let cost = 8 * parseInt(num);
        if (scavenger_asset >= cost){
            scavenger.num_teleport = parseInt(scavenger.num_teleport) + parseInt(num);
            scavenger.asset = parseInt(scavenger.asset) - cost;
            this.scavenger_list.delete(trans_from);
            this.scavenger_list.put(trans_from,JSON.stringify(scavenger));
            return "bought " + num + " teleport card";
        }
        else{
            return "insufficient asset"
        }
    }
    },

    claim_asset: function(){
        const trans_from = Blockchain.transaction.from;
        const prize = Math.floor(Math.random()*(21)+1);
        let scavenger = this.scavenger_list.get(trans_from);
        if(!scavenger){
            return "not found";
        }
        else{
            scavenger = JSON.parse(scavenger);
            scavenger.asset = parseInt(scavenger.asset) + prize;
            this.scavenger_list.delete(trans_from);
            this.scavenger_list.put(trans_from,JSON.stringify(scavenger));
            return "Won " + prize + " coins";
        }
    }
};

module.exports = scavenger_contract;