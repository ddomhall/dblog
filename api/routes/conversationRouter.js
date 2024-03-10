const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Conversation = require('../models/conversationModel.js')

router.get('/', async (req, res) => {
	res.json(await Conversation.find({users: req.cookies.session}).populate('users').exec())
})

router.post('/', async (req, res) => {
	const filter = {users: [req.cookies.session, req.body.recipient]}
	let conversation = await Conversation.findOne(filter).exec()

	if (!conversation) {
		conversation = await new Conversation(filter).save()
	}

	res.json(conversation)
})

module.exports = router


