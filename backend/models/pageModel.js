const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: false,
    },
    parent: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);