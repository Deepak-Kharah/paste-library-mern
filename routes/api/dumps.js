const express = require('express');
const router = express.Router();

// @route   GET api/d
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send('Dumps route');
});

module.exports = router;
