const express = require('express');
const group = require('../models/group.js');

let router = express.Router();

// GET route for listing all groups
router.get("/api/groups", (req, res) => {
    console.log('List all groups');

    group.select((err, result) => {
        if (err) {
            console.log(err);

            res.status(500).json({ 'error': 'oops we did something bad' });
        } else {
            res.status(200).json(result);
        }
    })
});

// GET route for retrieving a group
router.get("/api/groups/:direct_group_id", (req, res) => {
    console.log('Retrieve direct group: ' + req.params.direct_group_id);

    group.selectGroupsJoinMessages(req.params.direct_group_id, (err, result, params) => {
        if (err) {
            console.log(err);

            res.status(500).json({ 'error': 'oops we did something bad' });
        } else {
            let formatResult = formatGroupsObject(result);

            res.status(200).json(formatResult);
        }
    });
});

// POST route for creating a direct message group
router.post('/api/groups', (req, res) => {
    console.log('Create direct message group');

    // @TODO check if channel exists
    // do stuff
    // else
    group.create(req.body, (err, result) => {
        if (err) {
            console.log(err);

            res.status(500).json({ 'error': 'oops we did something bad' });
        } else {
            res.status(200).json({
                direct_group_id: result.insertId
            });
        }
    });
});

// Format the JSON user response object
let formatGroupsObject = result => {
    let newResult = {
        'direct_group_id': result[0].direct_group_id,
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