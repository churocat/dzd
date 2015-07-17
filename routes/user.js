var mongojs    = require('mongojs');
var dzdRes     = require('../lib/dzd-res');

var db = mongojs('dzd', ['user', 'participate', 'weight']);

exports.getGidsByUid = function(req, res) {
    var uid = req.params.uid;

    // todo: check if uid in db.user
    db.participate.find({uid: uid}, function(err, docs) {

        var output = [];
        docs.forEach(function (doc) {
            output.push(doc.gid);
        });

        res.json(dzdRes(dzdRes.STATUS_OK, output));
    });
}
