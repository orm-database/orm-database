// Dependencies

// Routes
module.exports = app => {
    // POST route for users
    app.post('/api/users', (req, res) => {
        let payload = req.body;

        console.log('API routes response:');
        console.log(payload);

        res.json(payload);
    });

    // POST route for messages
    app.post('/api/messages', (req, res) => {
        let payload = req.body;

        console.log('API routes response:');
        console.log(payload);

        res.json(payload);
    });
};