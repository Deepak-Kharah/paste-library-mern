const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile
// @desc    Get user profile
// @access  Private
router.get('/', auth, async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [ 'username' ]);

    if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' });
    }

    return res.json(profile);
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth, async (req, res) => {
    const { summary } = req.body;

    const profileFields = {
        user: req.user.id,
        summary
    };

    try {
        // Update or create profile (using upsert method)
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true }
        );
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
