const mongoose = require('mongoose');

const DumpSchema = mongoose.Schema(
    {
        title: {
            type: String
        },
        text: {
            type: String,
            required: true
        },
        password: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId
        },
        access: {
            type: String,
            enum: [ 'PVT', 'UNL' ],
            uppercase: true
        },
        has_expiration_date: {
            type: Boolean,
            default: false
        },
        expiration_date: {
            type: Date,
            default: () => {
                let oneYearFromNow = new Date();
                oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                return oneYearFromNow;
            }
        },
        slug: {
            type: String,
            required: true
        }
    },
    { timestamp: true }
);

module.exports = Dump = mongoose.model('dump', DumpSchema);
