// Dependencies
const users = require('../controllers/users-controller');

// Routes
module.exports = app => {
    // POST route for creating a user
    app.post('/api/users', (req, res) => {
        users.create(req, res)
    });

    // POST route for messages
    app.post('/api/messages', (req, res) => {
        console.log('API routes response:');
        console.log(req.body);

        res.json(req.body);
    });
};