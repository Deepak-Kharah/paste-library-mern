const bcrypt = require('bcrypt');
const express = require('express');
const { check, validationResult } = require('express-validator');
const nanoid = require('../../config/nanoid');

const Dump = require('../../models/Dump');
const auth = require('../../middleware/auth');
const optToken = require('../../middleware/addOptionalToken');

const router = express.Router();

// @route   POST api/d
// @desc    Create new paste dump
// @access  Public
router.post('/', [ optToken, [ check('text', 'Text is required').not().isEmpty() ] ], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, text, password, access, expiration_date } = req.body;

    let dumpFields = {};

    // populating fields
    dumpFields.text = text;
    if (title) dumpFields.title = title;
    if (password) dumpFields.password = password;
    if (expiration_date) {
        dumpFields.has_expiration_date = true;
        dumpFields.expiration_date = expiration_date;
    }
    if (req.user) {
        if (access) {
            // if value is not recognised: default it to private access for logged in user only
            dumpFields.access = [ 'PVT', 'UNL' ].includes(access.toUpperCase()) ? access.toUpperCase() : 'PVT';
        } else {
            dumpFields.access = 'PVT';
        }
    }

    try {
        const newDump = new Dump(dumpFields);
        if (newDump.password) {
            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUND));

            newDump.password = await bcrypt.hash(password, salt);
        }

        // adding unique slug
        let slug = await nanoid();
        while (await Dump.findOne({ slug })) {
            slug = await nanoid();
        }
        newDump.slug = slug;

        // adding user if logged in else anonymous user
        if (req.user) {
            newDump.user = req.user.id;
        } else {
            newDump.user = process.env.DEFAULT_USER_ID;
        }
        const dump = await newDump.save();
        return res.json(dump);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ errors: [ { msg: 'Server Error' } ] });
    }
});

// @route   GET api/d/:slug
// @desc    get respective dump from slug
// @access  Public (with restriction)
router.get('/:slug', optToken, async (req, res) => {
    try {
        const dump = await Dump.findOne({ slug: req.params.slug }).populate('user', [ 'id', 'username' ]);

        if (!dump) {
            return res.status(404).json({ errors: [ { msg: 'Dump not fund' } ] });
        }

        if (dump.access === 'PVT') {
            if (!req.user) {
                console.error('anonoym user');
                return res.status(404).json({ errors: [ { msg: 'Dump not found' } ] });
            }
            if (dump.user.id.toString() !== req.user.id) {
                console.error('unknown user');
                return res.status(404).json({ errors: [ { msg: 'Dump not found' } ] });
            }
        }

        if (dump.password) {
            // dump.toObject();
            // TODO logic remaining for password in dump
        }

        return res.json(dump);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   GET api/d/
// @desc    get all dump of current user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const dumps = await Dump.find({ user: req.user.id }).sort({ updatedAt: -1 });

        if (!dumps) {
            return res.status(404).json({ errors: { msg: 'Dump not found' } });
        }
        return res.json(dumps);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   DELETE api/d/:id
// @desc    delete dump by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const dump = await Dump.findById(req.params.id);

        if (!dump) {
            return res.status(404).json({ msg: 'Dump not found' });
        }

        if (dump.user.toString() !== req.user.id) {
            if (dump.access === 'PVT') {
                return res.status(404).json({ msg: 'Dump not found' });
            }
            return res.status(401).json({ msg: 'You cannot delete the dump' });
        }

        await dump.remove();
        console.log('deleted');
        return res.json({ msg: 'post deleted' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
