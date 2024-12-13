const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Page',
    }],
    content: {
        type: String,
        default: '',
    }
},
{ collection: 'Pages' },
{ timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
