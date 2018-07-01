app.factory('contractInfo', function(){
    const NebPay = require("nebpay");
    const nebPay = new NebPay();
    const contract_address = "n1y8aGFfi1dsYXpUVoREfpVgxEaiGjC7kiC";
    const callBackUrl = NebPay.config.testnetUrl;

    return {
        addr : contract_address,
        url : callBackUrl,
        nebPay : nebPay
    };

});