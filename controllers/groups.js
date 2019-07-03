const express = require('express');
const group = require('../models/group.js');

let router = express.Router();

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

module.exports = router;