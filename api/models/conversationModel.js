const mongoose = require('mongoose')

module.exports = mongoose.model('Conversation', new mongoose.Schema({
	users: {type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true},
}))

