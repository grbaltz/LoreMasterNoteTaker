const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: false,
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: false,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
