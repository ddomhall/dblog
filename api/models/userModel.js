const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	following: {type: [mongoose.Schema.Types.ObjectId], required: true},
})

module.exports = mongoose.model('User', userSchema)
