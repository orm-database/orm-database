var express = require("express");
var router = express.Router();
var message = require("../models/message.js");

router.get("/api/messages", (req, res) => {
    console.log('retrieve all messages');
    message.select( (rows) => {
        res.json(rows);
    })
});

router.get("/api/messages/:message_id", (req, res) => {
    console.log('retrieve message: '+req.params.message_id);
    message.selectWhere(req.params, (rows) => {
        res.json(rows);
    })
});

router.post("/api/messages", (req, res) => {
    // console.log('create message: ' + req.params.message_id);
    console.log(req.body);
    message.create(req.body, (rows) => {
        res.json(rows);
        res.status(200).end();
    })
});

router.delete("/api/messages/:message_id", (req, res) => {
    console.log('delete message: '+req.params.message_id);
    console.log(req.params);

    message.delete(req.params.message_id, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;