const bcrypt = require('bcrypt');
const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        // ensure to not return password
        const user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user and provide JWT (Login)
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please include a valid Email address').not().isEmpty().isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // Process Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Process data
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
            }

            // Authenticate password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

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
