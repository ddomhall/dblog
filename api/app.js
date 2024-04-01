const express = require('express')
const mongoose = require('mongoose')
const indexRouter = require('./routes/indexRouter.js')
const userRouter = require('./routes/userRouter.js')
const postRouter = require('./routes/postRouter.js')
const commentRouter = require('./routes/commentRouter.js')
const messageRouter = require('./routes/messageRouter.js')
const conversationRouter = require('./routes/conversationRouter.js')
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config()

const mongoDb = process.env.MONGODB_URI
mongoose.connect(mongoDb)
const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"))

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/messages', messageRouter)
app.use('/conversations', conversationRouter)


app.listen(3000, console.log('listening on :3000'))
