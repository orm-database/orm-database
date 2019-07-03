const express = require("express");
const channel = require("../models/channel.js");

let router = express.Router();

// GET route for listing all channels
router.get("/api/channels", (req, res) => {
    console.log('retrieve all channels');

    channel.select((err, result) => {
        if (err) {
            console.log(err);

            res.status(500).json({ 'error': 'oops we did something bad' });
        } else {
            res.status(200).json(result);
        }
    })
});

// GET route for retrieving a channel
router.get("/api/channels/:channel_id", (req, res) => {
    console.log('retrieve channel: ' + req.params.channel_id);

    channel.selectChannelsJoinMessages(req.params.channel_id, (err, result, params) => {
        if (err) {
            console.log(err);

            res.status(500).json({ 'error': 'oops we did something bad' });
        } else {
            let formatResult = formatChannelsObject(result);

            res.status(200).json(formatResult);
        }
    });
});

// POST route for creating a channel
router.post('/api/channels', (req, res) => {
    console.log('create channel');

    // @TODO check if channel exists
    // do stuff
    // else
    channel.create(req.body, (err, result) => {
        if (err) {
            console.log(err);

            res.status(500).json({ 'error': 'oops we did something bad' });
        } else {
            res.status(200).json({
                channel_id: result.insertId,
                channel_name: req.body.channel_name
            });
        }
    });
});

// DELETE route for deleting a channel
// @TODO: must delete parent object
router.delete("/api/channels/:channel_id", (req, res) => {
    console.log('delete channel: ' + req.params.channel_id);

    channel.delete({ channel_id: req.params.channel_id }, (err, result) => {

        console.log(result)
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// GET route for retrieving channel users
router.post('/api/channel-users/', (req, res) => {
    console.log('add channel users');

    req.body.users.forEach(userId => {
        channel.insertChannelUsers(
            {
                channel_id: req.body.channel_id,
                user_id: userId
            },
            (err, result) => {
                console.log(result)
                if (err) {
                    console.log(err);

                    res.status(500).json({ 'error': 'oops we did something bad' });
                } else {
                    res.status(200).json({
                        message: 'complete'
                    });
                }
            }
        );
    });
});

// Format the JSON user response object
let formatChannelsObject = result => {
    let newResult = {
        'channel_id': result[0].channel_id,
        'channel_name': result[0].channel_name,
        'messages': []
    };

    if (result.messages) {
        result.forEach(element => {
            newResult.messages.push({
                message_id: element.message_id,
                message_text: element.message_text,
                message_time: element.message_time,
                user: {
                    user_id: element.user_id,
                    first_name: element.first_name,
                    last_name: element.last_name,
                    email_address: element.email_address,
                    alias: element.alias,
                    created: element.created,
                    updated: element.updated
                }
            });
        });
    }

    return newResult;
};

module.exports = router;