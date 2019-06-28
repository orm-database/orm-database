// Dependencies
let users = require('../controllers/users-controller');

// Routes
module.exports = function (app) {
    // POST route for creating a user
    app.post('/api/users', function (req, res) {
        users.create(req, res);
    });

    // POST route for user login
    app.post('/api/users/login', function (req, res) {
        users.login(req, res);
    });

    // POST route for user login
    app.delete('/api/users/login', function (req, res) {
        users.logout(req, res);
    });

    // GET route for fetching one user by session token header or
    // all users by default
    app.get('/api/users', function (req, res) {
        users.get(req, res);
    });

    // GET route for fetching one user by ID
    app.get('/api/users/:id', function (req, res) {
        users.getUserById(req, res);
    });

    // DELETE route for deleting a user
    app.delete('/api/users/:id', function (req, res) {
        users.delete(req, res);
    });

    // POST route for messages
    app.post('/api/messages', function (req, res) {
        console.log('API routes response:');
        console.log(req.body);

        res.json(req.body);
    });
};