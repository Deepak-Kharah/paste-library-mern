const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        avatar: {
            type: String
        },
        summary: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = Profile = mongoose.model('profile', ProfileSchema);
