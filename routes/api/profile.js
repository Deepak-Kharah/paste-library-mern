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
        return res.status(404).json({ errors: [ { msg: 'Profile not found' } ] });
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
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route    DELETE api/profile
// @desc     Delete user profile, user and dumps (maybe)
// @access   Private

router.delete('/', auth, async (req, res) => {
    try {
        // Delete profile
        await Profile.findOneAndDelete({ user: req.user.id });

        // Delete user
        await User.findOneAndDelete({ _id: req.user.id });
        return res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});
module.exports = router;
