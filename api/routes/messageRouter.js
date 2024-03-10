const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Message = require('../models/messageModel.js')
const Conversation = require('../models/conversationModel.js')

router.get('/', async (req, res) => {
	res.json(await Message.find({conversation: req.query.id}).sort({time: 1}).populate('sender').exec())
})

router.post('/', async (req, res) => {
	await new Message({content: req.body.content, sender: req.cookies.session, conversation: req.body.conversation, time: new Date()}).save()
})

module.exports = router

