const bcrypt = require('bcrypt');
const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const router = express.Router();

// Validation
function uniqueConstraintValidator(field, db_name) {
    return User.findOne({ [db_name]: field }).then((user) => {
        if (user) {
            return Promise.reject(`${db_name} already exist`);
        }
    });
}

// @route   POST api/users
// @desc    register user
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
            return res.status(400).json({ errors: errors.array() });
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
                return res.json({ token });
            }); //TODO: change to 3600 when in production
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    }
);

module.exports = router;
