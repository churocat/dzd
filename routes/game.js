var mongojs = require('mongojs');
var async   = require('async');
var dzdRes  = require('../lib/dzd-res');


var db = mongojs('dzd', ['user', 'participate', 'weight']);

exports.getTeamWeight = function(req, res) {
    var gid = req.params.gid;

    db.participate.find({gid: gid}, {uid: 1}, function(err, users) {

        var output = [];
        var calls = [];

        users.forEach(function(user) {
            calls.push(function(callback) {
                db.weight.find({uid: user.uid}, function(err, weights) {
                    output.push({uid: user.uid, data: weights});
                    callback(null, user);
                });
            });
        });

        async.parallel(calls, function(err, result) {
            res.json(dzdRes(dzdRes.STATUS_OK, output));
        });

    });
}
