var express = require("express");
var router = express.Router();
var user = require("../models/user.js");

router.get("/api/users", (req, res) => {
    console.log('retrieve all users');
    user.select(function (rows) {
        res.json(rows);
    })
});

router.get("/api/users/:user_id", (req, res) => {
    console.log('retrieve user ');
    console.log(req.params);
    user.selectWhere(req.params, (rows) => {
        res.json(rows);
    })
});

router.post("/api/users", (req, res) => {
    console.log('create user')
    user.createUser(req.params, (rows) => {
        res.json(rows);
        res.status(200).end();
    })
});

router.delete("/api/users/:user_id", (req, res) => {
    console.log('delete user: ');
    console.log(req.params);

    user.deleteUser(req.params.user_id, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;