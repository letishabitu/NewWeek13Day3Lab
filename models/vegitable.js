const mongoose = require('mongoose');
const vegitableSchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    readyToEat: Boolean
})

const  Vegitable = mongoose.model('vegitable', vegitableSchema);

module.exports = Vegitable;