var mongojs    = require('mongojs');
var dzdRes     = require('../lib/dzd-res');

var db = mongojs('dzd', ['weight']);

exports.findAll = function(req, res) {
    db.weight.find(function(err, docs) {
        res.json(dzdRes(dzdRes.STATUS_OK, docs));
    });
}

exports.addOne = function(req, res) {
    // todo: check all columns needed are existed
    db.weight.insert(req.body, function(err, doc) {
        res.json(dzdRes(dzdRes.STATUS_OK, doc));
    });
}

exports.findByUid = function(req, res) {
    var uid = req.params.uid;

    // todo: check if uid in db.user
    db.weight.find({uid: uid}, function(err, docs) {
        res.json(dzdRes(dzdRes.STATUS_OK, docs));
    });
}

exports.updateById = function(req, res) {
    var id = req.params.id;
    db.weight.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {date: req.body.date, number: req.body.number, unit: req.body.unit}},
        new: true
    }, function (err, doc) {
        res.json(dzdRes(dzdRes.STATUS_OK, doc));
    });
}

exports.deleteById = function(req, res) {
    var id = req.params.id;
    db.weight.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(dzdRes(dzdRes.STATUS_OK, doc));
    });
}

