const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	content: {type: String, required: true},
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	date: {type: Date, required: true},
	published: {type: Boolean, required: true},
})

module.exports = mongoose.model('Post', postSchema)

