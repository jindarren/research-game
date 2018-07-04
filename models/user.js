var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('user2', new Schema({
    device: String,
    time: Date,
    duration: String,
    network: String,
    score: Number
}));