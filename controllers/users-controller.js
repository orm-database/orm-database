// Dependencies
let hashpass = require('hashpass');
let uuidv1 = require('uuid/v1');
let users = require('../models/user');

// Create a user
let create = function (req, res) {
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
            salt: hashedPassword.salt,
            session_token: 'abcdefg', // @TODO replace placeholder
            created: req.body.created
        };
        users.createUser(userRequest, function (err, result) {
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
};

// Log in as a user
let login = function (req, res) {

    if (req.body.email_address === undefined) {

        users.selectByAlias(req.body.alias, function (err, result) {
            handleLogin(req, res, err, result);
        });
    }
    else {
        users.selectByEmail(req.body.email_address, function (err, result) {
            handleLogin(req, res, err, result);
        });
    }
};

// Log out as a user
let logout = function (req, res) {
    users.removeSession(req.headers['x-session-token'], function (err, result) {
        res.status(200).json({ 'message': 'user logged out successfully' });
    });
};

// Fetch one user by session_token or all users
let getUsers = function (req, res) {
    if (req.headers['x-session-token']) {

        users.selectBySession(req.headers['x-session-token'], function (err, result) {
            if (result.length) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        });
    } else {
        users.selectAll(function (err, result) {
            res.status(200).json({ data: result });
        });
    }
};

// Fetch one user by ID
let getUserById = function (req, res) {
    users.selectById(req.params.id, function (err, result) {
        if (result.length) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ 'error': 'user not found' });
        }
    });
};

// Delete a user
let deleteUser = function (req, res) {
    users.delete(req.params.id, function (err, result) {
        res.status(200).json({ 'message': 'user deleted successfully' });
    });
};

// Update the user from the SELECT query with a session_token
let handleLogin = function (req, res, err, result) {
    if (err) {
        console.log(err);
        res.status(500).json({ 'error': 'oops we did something bad' });
    } else if (!result.length) {
        res.status(404).json({ 'error': 'user not found' });
    } else {
        let user = result[0];
        loginAttempt = hashpass(req.body.password, user.salt);
        if (loginAttempt.hash === user.password) {
            let uuid = uuidv1();
            users.updateSession(user.email_address, uuid, function (error, queryResult) {
                delete user.password;
                delete user.salt;
                delete user.session_token;
                res.header('x-session-token', uuid).status(200).json(user);
            });
        } else {
            res.status(401).json({ 'error': 'improper login credentials' });
        }
    }
};

module.exports = {
    create: create,
    login: login,
    logout: logout,
    get: getUsers,
    getUserById: getUserById,
    delete: deleteUser
};