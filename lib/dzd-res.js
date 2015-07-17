module.exports = function(status, data) {
    var res = {'status': status, 'data': data};
    return res;
};

// status
module.exports.STATUS_OK = "OK";
