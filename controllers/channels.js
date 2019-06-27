var express = require("express");
var router = express.Router();
var channel = require("../models/channel.js");

router.get("/api/channels", function (req, res) {
    console.log('retrieve all channels');
    channel.select(function (rows) {
        res.json(rows);
    })
});

router.get("/api/channels/:channel_id", function (req, res) {
    console.log('retrieve channel: '+req.params.channel_id);
    channel.selectWhere(req.params, function (rows) {
        res.json(rows);
    })
});

router.post("/api/channels", function (req, res) {
    console.log('create channel: ' + req.params.channel_id);
    channel.createUser(req.params, function (rows) {
        res.json(rows);
        res.status(200).end();
    })
});

router.delete("/api/channels/:channel_id", function (req, res) {
    console.log('delete channel: '+req.params.channel_id);
    console.log(req.params);

    channel.deleteUser(req.params.channel_id, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;