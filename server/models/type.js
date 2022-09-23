const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    name: {
        type: String
    }
});

exports.Type = mongoose.model('Type',typeSchema);