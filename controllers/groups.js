const express = require('express');
const group = require('../models/group.js');
const router = express.Router();

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

// POST route for adding direct message group users
router.post('/api/groups/:direct_group_id', (req, res) => {
    console.log('Add direct message group users');

    req.body.users.forEach(userId => {
        group.insertGroupUsers(
            {
                direct_group_id: req.params.direct_group_id,
                user_id: userId
            },
            (err, result) => {

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

module.exports = router;