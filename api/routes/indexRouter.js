const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
	const user = await User.findOne({username: req.body.username}).exec()

	if (!user) {
		res.status(404).json({msg: "user not found"})
	} else {
		bcrypt.compare(req.body.password, user.password, function(err, result) {
			if (err) {
				res.status(500).json({msg: "something went wrong"})
			} else if (!result) {
				res.status(404).json({msg: "incorrect password"})
			} else {
				res.cookie("session", user._id.toString()).json({m: 'success'})
			}
		})
	}
})

router.post('/logout', (req, res) => {
	res.clearCookie('session').json({m: 'success'})
})

router.get('/search', async (req, res) => {
	res.json(await User.findOne({username: req.query.username}).exec())
})

module.exports = router
