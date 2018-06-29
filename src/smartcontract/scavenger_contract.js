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

};


scavenger_contract.prototype = {
    init :function(){
        this.scavengers_id = 688;
        this.puzzel_id = 182;
        this.puzzel_list_index = 0;
        this.scavenger_list_index = 0;
    },

    create_new_puzzel: function(req){
    let cooked_req = JSON.parse(req);
    const trans_addr = Blockchain.transaction.from;

    cooked_req.id = this.puzzel_id++;
    cooked_req.from = trans_addr;
    this.puzzel_id_list.put(this.puzzel_list_index++, cooked_req.id);
    this.puzzel_list.put(cooked_req.id, JSON.stringify(cooked_req));

    let scavenger = this.scavenger_list.get(trans_addr);
    if(!scavenger){
        scavenger= {
            id: this.scavengers_id++,
            addr: trans_addr,
            name: "Rookie",
            num_teleport: 10,
            num_answer: 0,
            attempts: 0,
            puzzels: [this.puzzel_list_index]
        };
    this.scavenger_list.put(trans_addr, JSON.stringify(scavenger));
    this.scavenger_addr_list.put(this.scavenger_list_index++,trans_addr);
    }
    else{
        scavenger = JSON.parse(scavenger);
        scavenger.puzzels = scavenger.puzzels.push(cooked_req);
        this.scavenger_list.delete(trans_addr);
        this.scavenger_list.put(trans_addr, JSON.stringify(scavenger));
    }
    },

    submit_answer: function(req){
    let cooked_req = JSON.parse(req);
    let pass = 0;
    const trans_addr = Blockchain.transaction.from;
    let puzzel = this.puzzel_list.get(parseInt(cooked_req.id));
    if(!puzzel){
        return "error";
    }
    else{
    puzzel = JSON.parse(puzzel);
    let user_ans = cooked_req.ans.toString().toLowerCase();
    if(puzzel.ans.toString().toLowerCase() === user_ans)
       pass = 1;
    let scavenger = this.scavenger_list.get(trans_addr);
    if(!scavenger){
      scavenger= {
            id: this.scavengers_id++,
            addr: trans_addr,
            name: "Rookie",
            num_teleport: 10,
            num_answer: pass,
            attempts: 1,
            puzzels: []
        };
      this.scavenger_list.put(trans_addr, JSON.stringify(scavenger));
      this.scavenger_addr_list.put(this.scavenger_list_index++,trans_addr);
    }
    else{
      scavenger = JSON.parse(scavenger);
      scavenger.attempts = parseInt(scavenger.attempts) + 1;
      //TODO :::: continue here!!!!!!
      switch(pass){
          case 1: scavenger.num_answer = parseInt(scavenger.num_answer) + 1;
                  break;
          case 0: break;
      }

      this.scavenger_list.delete(trans_addr);
      this.scavenger_list.put(trans_addr, JSON.stringify(scavenger));
    }
    }

    }
};

module.exports = scavenger_contract;