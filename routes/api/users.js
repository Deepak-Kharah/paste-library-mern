const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// Validation
function uniqueConstraintValidator(field, db_name) {
    return User.findOne({ [db_name]: field }).then((user) => {
        if (user) {
            return Promise.reject(`${db_name} already exist`);
        }
    });
}

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post(
    '/',
    [
        check('username', 'Username is required')
            .not()
            .isEmpty()
            .bail()
            .custom((field) => uniqueConstraintValidator(field, 'username')),
        check('email', 'Please include a valid Email address')
            .isEmail()
            .bail()
            .custom((email) => uniqueConstraintValidator(email, 'email')),
        check('password', 'Password must have 6 characters or more').isLength({ min: 6 })
    ],
    async (req, res) => {
        // Process Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        // Process data
        const { username, email, password } = req.body;

        try {
            let user = new User({
                username,
                email,
                password
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUND));

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, process.env.JWT_PASSWORD, { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            }); //TODO: change to 3600 when in production
        } catch (err) {
            console.error(err.message);
            res.status(500).send(`Server error: ${err.message}`);
        }
    }
);

module.exports = router;
