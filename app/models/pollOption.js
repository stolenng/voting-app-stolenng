var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollOption = new Schema({
    name: String,
    count: {
        type: Number,
        default: 0
    }
}, {
    _id: false
}, {
    versionKey: false
});

//exporting only the schema type
module.exports = pollOption;