const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const Post = require('../models/postModel.js')
const Comment = require('../models/commentModel.js')

router.get('/', async (req, res) => {
	if (req.query.id) {
		let user = await User.findOne({_id: req.query.id}).exec()
		res.json(await Post.find({author: {$in: user.following}, published: true}).populate('author').exec())
	} else {
		res.json(await Post.find({published: true}).populate('author').exec())
	}
})

router.post('/', async (req, res) => {
	if (req.body.content) {
		const post = new Post({
			content: req.body.content,
			author: req.body.author,
			published: req.body.published,
			date: new Date(),
		}).save()
		res.json({msg: "post created", status: 200})
	} else {
		res.json({msg: 'no content', status: 404})
	}
})

router.get('/:id', async (req, res) => {
	res.json(await Post.findOne({_id: req.params.id}).populate('author').exec())
})

router.get('/:id/comments', async (req, res) => {
	res.json(await Comment.find({post: req.params.id}).populate('author').exec())
})

router.post('/:id/comments', async (req, res) => {
	if (req.body.content && req.body.author) {
		const comment = new Comment({
			content: req.body.content,
			author: req.body.author,
			post: req.params.id,
			date: new Date()
		}).save()
		res.json({msg: "comment created"})
	} else {
		res.json({m: 'no content'})
	}
})

router.put('/:id/update', async (req, res) => {
	Post.findByIdAndUpdate(req.params.id, {content: req.body.content}).exec()
})

router.delete('/:id/delete', async (req, res) => {
	await Comment.deleteMany({post: req.params.id}).exec()
	await Post.findByIdAndDelete(req.params.id).exec()
})
module.exports = router

