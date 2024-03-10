const mongoose = require('mongoose')

module.exports = mongoose.model('Message', new mongoose.Schema({
	content: {type: String, required: true},
	sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	conversation: {type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true},
	time: {type: Date, required: true},
}))

