app.factory('contractInfo', function(){
    const NebPay = require("nebpay");
    const nebPay = new NebPay();
    const contract_address = "n1fZprnBvDhixrLExkHmC9cUNSi27S94g6z";
    const callBackUrl = NebPay.config.testnetUrl;

    return {
        addr : contract_address,
        url : callBackUrl,
        nebPay : nebPay
    };

});