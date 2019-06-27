// Dependencies
const hashpass = require('hashpass');

let users = {
    // Create a user
    create: (req, res) => {
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

            res.status(200).json(userRequest);
        }
    },
    // Log in as a user
    login: (req, res) => {
        let hashedPassword = hashpass(req.body.password); // Placeholder for confirming password
        let password = hashedPassword.hash; // Placeholder for confirming password
        let failAttempt = false; // Placeholder for testing unmatched password

        loginAttempt = hashpass(req.body.password, hashedPassword.salt);
        if ((loginAttempt.hash === password) &&
            (!failAttempt)) {
            res.status(200).json({ alias: req.body.alias });
        } else {
            res.status(401).json({ 'error': 'improper login credentials' });
        }
    },
    // Log out as a user
    logout: (req, res) => {
        res.json({ 'message': 'user logged out successfully' });
    }
};

module.exports = users;