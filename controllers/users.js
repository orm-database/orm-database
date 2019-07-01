const express = require('express');
const hashpass = require('hashpass');
const uuidv1 = require('uuid');
const user = require('../models/user.js');
const router = express.Router();

// GET route for fetching one user by session token header or
// all users by default
router.get('/api/users', (req, res) => {
    console.log('list all users');

    if (req.headers['x-session-token']) {

        user.selectWhere(req.headers['x-session-token'], (err, result) => {
            if (result.length) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        });
    } else {
        user.select((err, result) => {
            res.status(200).json({ data: result });
        });
    }
});

// GET route for fetching one user by ID
router.get('/api/users/:id', (req, res) => {
    console.log('retrieve user');

    user.selectWhere({ user_id: req.params.id }, (err, result) => {
        if (result.length) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ 'error': 'user not found' });
        }
    })
});

// POST route for creating a user
router.post('/api/users', (req, res) => {
    console.log('create user')

    if (!req.body.email_address.includes('@') || !req.body.email_address.includes('.')) {
        res.status(400).json({ 'error': 'email is not valid' });
    } else if (req.body.password !== req.body.password_confirm) {
        res.status(400).json({ 'error': 'passwords do not match' });
    } else {
        let hashedPassword = hashpass(req.body.password);
        let userRequest = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_address: req.body.email_address,
            alias: req.body.alias,
            password: hashedPassword.hash,
            salt: hashedPassword.salt
        };
        user.createUser(userRequest, (err, result) => {
            if (err) {
                console.log(err);
                if (err.sqlMessage.includes('Duplicate')) {
                    res.status(400).json({ 'error': 'email already exists in system' });
                } else {
                    res.status(500).json({ 'error': 'oops we did something bad' });
                }
            } else {
                res.status(200).json({
                    user_id: result.insertId,
                    email: userRequest.email_address
                });
            }
        });
    }
});

// POST route for user log in
router.post('/api/users/login', (req, res) => {
    if (req.body.email_address === undefined) {

        user.selectWhere(req.body.alias, (err, result) => {
            handleLogin(req, res, err, result);
        });
    }
    else {
        user.selectByEmail(req.body.email_address, (err, result) => {
            handleLogin(req, res, err, result);
        });
    }
});

// POST route for user log out
router.delete('/api/users/login', (req, res) => {
    user.update({ session_token: req.headers['x-session-token'] }, (err, result) => {
        res.status(200).json({ 'message': 'user logged out successfully' });
    });
});

// DELETE route for deleting a user
router.delete('/api/users/:id', (req, res) => {
    console.log('delete user: ');

    user.deleteUser(req.params.id, (err, result) => {
        if (result.affectedRows === 0) {
            return res.status(404).json({ 'message': 'user delete failed' });
        } else {
            res.status(200).json({ 'message': 'user deleted successfully' });
        }
    });
});

// Update the user from the SELECT query with a session_token
let handleLogin = (req, res, err, result) => {
    if (err) {
        console.log(err);
        res.status(500).json({ 'error': 'oops we did something bad' });
    } else if (!result.length) {
        res.status(404).json({ 'error': 'user not found' });
    } else {
        let userResult = result[0];
        loginAttempt = hashpass(req.body.password, userResult.salt);
        if (loginAttempt.hash === userResult.password) {
            let uuid = uuidv1();
            user.updateSession(userResult.email_address, uuid, (error, queryResult) => {
                delete userResult.password;
                delete userResult.salt;
                delete userResult.session_token;
                res.header('x-session-token', uuid).status(200).json(userResult);
            });
        } else {
            res.status(401).json({ 'error': 'improper login credentials' });
        }
    }
};

module.exports = router;