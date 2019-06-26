// Dependencies
const hashpass = require('hashpass');

let users = {
    // Create a user
    create: (req, callback) => {
        if (!req.body.email_address.includes('@') || !req.body.email_address.includes('.')) {
            res.status(400).json({ 'error': 'email is not valid' });
        } else if (req.body.password !== req.body.password_confirm) {
            res.status(400).json({ 'error': 'passwords do not match' });
        } else {
            let hashedPassword = hashpass(req.body.password);
            let userRequest = {
                email_address: req.body.email_address,
                password: hashedPassword.hash,
                salt: hashedPassword.salt
            };

            callback(userRequest);
        }
    }
};

module.exports = users;