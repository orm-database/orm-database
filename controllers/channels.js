const express = require('express');
const channel = require('../models/channel.js');
const router = express.Router();

// Official

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

// POST route for adding channel users
router.post('/api/channel-users', (req, res) => {
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

// Unofficial

router.get('/api/channels', (req, res) => {
    console.log('retrieve all channels');
    channel.select((rows) => {
        res.json(rows);
    })
});

router.get('/api/channels/:channel_id', (req, res) => {
    console.log('retrieve channel: ' + req.params.channel_id);
    channel.selectWhere(req.params, (rows) => {
        res.json(rows);
    })
});

router.delete('/api/channels/:channel_id', (req, res) => {
    console.log('delete channel: ' + req.params.channel_id);
    console.log(req.params);

    channel.delete(req.params.channel_id, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;