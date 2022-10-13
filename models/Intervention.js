const mongoose = require('mongoose');

const interventionSchema = mongoose.Schema({
    motif: { type: String, required: true },
    lieu: { type: String, required: true },
    date: { type: Date, required: false },
    numAgent: { type: String, required: true},
    imageUrl: { type: String, required: false }
})

module.exports = mongoose.model('Intervention', interventionSchema);